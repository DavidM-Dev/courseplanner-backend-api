import { gql } from 'apollo-server-express';

const programSchema = gql`
  extend type Mutation {
    addProgram(id: ID): Program,
    removeProgram(id: ID): Boolean,
    modifyProgram(id: ID): Program
  }
  
  """
  An academic program, such as "Honours BMath, Co-Op"; or "BCS Data Science Option"
  """
  type Program {
    id: ID!,
    author: User,
    university: String,
    requirements: [Requirement]
  }
`

const programResolver = {
  Program: {
    university: () => 'university-test',
    requirements: () => []
  },
  Mutation: {
    addProgram: (_: any, {}: {}, { db, userId }: Context) => {

    },
    removeProgram: (_: any, {}: {}, { db, userId }: Context) => {

    }
  }
}

export { programSchema, programResolver };
