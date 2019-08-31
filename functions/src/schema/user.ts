import { gql } from 'apollo-server-express';

const userSchema = gql`
  extend type Query {
    "Gets a specific user's info (within credential limits)"
    getUser(id: ID): User,
    "Gets the current user's info"
    getMyInfo: User
  }

  extend type Mutation {
    "Creates a new user, with some basic information"
    createUser(firstName: String, email: String, lastName: String): User,

    "Changes the user's default sequence"
    updateSequence(newSequence: [String]): [String]
  }

  type User {
    "The unqiue identifier that corresponds with firebase auth"
    id: ID!,

    firstName: String,
    lastName: String,
    email: String,

    "A list of the user's academic plans"
    plans: [FullPlan],

    "A list of the user's currently enrolled programs. (FullPlan.programs takes priority)"
    programs: [Program],

    """
    The user's co-op sequence, or just the schedule in which they plan to take study terms.
    "STUDY" represents a study term, "WORK" represents a work term, "CHILL" represents a chill term.
    (FullPlan.sequence takes priority)
    """
    sequence: [String] # TODO: this should be an enum, not a string
  }
`

/** Generates a resolver function that will only return the field if the user has the 
 * appropriate credentials. */
const userPrivateField = (fieldName: string) => (
  (parent: any, _: any, { userId }: Context) => {
    return userId===parent.id ? parent[fieldName] : null;
  }
)

const userResolver = {
  Query: {
    getUser: async (_: any, { id }: { id: string }, { db }: Context) => {
      const res = await db.collection('users').doc(id).get();
      return { id: id, ...res.data()};
    },
    getMyInfo: async (_1: any, _2: any, { db, userId }: Context) => {
      const res = await db.collection('users').doc(userId).get();
      return { id: res.id, ...res.data() };
    }
  },
  User: {
    lastName: userPrivateField('lastName'),
    email: userPrivateField('email'),
    plans: async ({ planIds: planIdsStr }: { planIds: string }, _: any, { db }: Context) => {
      // makes db requres to fetch plan info
      const planIds = planIdsStr.split(',').filter(str => str !== '');
      if(planIds.length === 0) return []; // do not anger the javascript...
      const coll = db.collection('plans');
      const docs = planIds.map((id) => coll.doc(id));
      const results = await db.getAll(...docs);
      return results.map((res) => ({ id: res.id, ...res.data()}));
    },
    programs: async ({ programIds: programIdsStr }: { programIds: string }, _: any, { db }: Context) => {
      // makes db request to fetch program info
      const programIds = programIdsStr.split(',').filter(str => str !== '');
      if(programIds.length === 0) return [];
      const coll = db.collection('programs');
      const docs = programIds.map((id) => coll.doc(id));
      const results = await db.getAll(...docs);
      return results.map((res) => ({ id: res.id, ...res.data()}))
    },
    sequence: async ({ sequence: sequenceStr }: { sequence: string }) => {
      // the db stores this as a comma-separated string.
      return sequenceStr.split(',').filter(str => str !== '');
    }
  },
  Mutation: {
    // TODO: Really need to find a way to define graphql schemas and interfaces at the same time.
    createUser: async (_: any, { firstName, email, lastName }: { firstName: string, email: string, lastName: string}, { db, userId }: Context) => {
        const defaultUser = {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          planIds: '',
          programIds: '',
          sequence: 'STUDY,STUDY,CHILL,STUDY,STUDY,CHILL,STUDY,STUDY,CHILL,STUDY,STUDY'
        }
        await db.collection('users').doc(userId).set(defaultUser);
        return defaultUser;
    },
    updateSequence: async (_: any, { newSequence }: { newSequence: any }, { db, userId }: Context) => {
      const userRef = db.collection('users').doc(userId);
      const newSequenceStr = newSequence.join(',');
      const { sequence: sequenceStr }: { sequence: string } = await db.runTransaction(async t => {
        const oldUser = (await t.get(userRef)).data();
        const newUser = {...oldUser, sequence: newSequenceStr};
        t.set(userRef, {
          sequence: newSequenceStr
        });
        return newUser;
      });
      return sequenceStr.split(',').filter(str => str !== '');
    }
  }
}

export { userSchema, userResolver };
