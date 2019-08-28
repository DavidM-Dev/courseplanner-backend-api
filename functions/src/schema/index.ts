import { gql } from 'apollo-server-express';

import { userSchema, userResolver, userModel } from './user';

// apollo requires this link schema, apparently (idk why)
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default {
  typeDefs: [linkSchema, userSchema],
  resolvers: [userResolver],
  models: {
    User: userModel
  }
};
