import { gql } from 'apollo-server-express';

const programSchema = gql`
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
  }
}

export { programSchema, programResolver };
