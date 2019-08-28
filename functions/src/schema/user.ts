import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!,
    firstName: String!,
    lastName: String,
    email: String!,

    "A list of the user's academic plans"
    plans: [FullPlan],
    "Create a new plan, from scratch"
    createEmptyPlan(): FullPlan,
    "Copy someone else's plan into your saved plans so that you can edit it"
    clonePlan(id: ID!): FullPlan,
    "Removes a plan. Returns true if successful"
    removePlan(id: ID!): Boolean,

    "A list of the user's currently enrolled programs. (FullPlan.programs takes priority)"
    programs: [Program],
    "Appends a program to the end of the list"
    addProgram(id: ID!): Program,
    "Removes a program from the list. Returns true if successful"
    removeProgram(id: ID!): Boolean

    """
    The user's co-op sequence, or just the schedule in which they plan to take study terms.
    "STUDY" represents a study term, "WORK" represents a work term, "CHILL" represents a chill term.
    (FullPlan.sequence takes priority)
    """
    sequence: [String],
    modifySequence(sequence: [String]): [String]
  }
`
const userResolvers = {
  User: (obj, args, context) => {
    // TODO
  }
}


export default { userSchema, userResolvers }
