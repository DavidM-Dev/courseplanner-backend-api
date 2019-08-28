import { gql } from 'apollo-server-express';


const termPlanSchema = gql`
  """
  A list of courses that the user plans to take in a single term.
  """
  type TermPlan {
    "The individual courses within the term"
    courses: [CoursePlan],
    "The name of the term (e.g. 'Fall 2019', 'Winter 2020')"
    termName: String,
    "The name of the term relative to the user (e.g. 4A, 2B, etc.)"
    userTermName: String,
    "The index of the term in the FullPlan wrapper"
    index: Int
  }
`

const termPlanResolver = {
  TermPlan: {
    termName: () => 'term-name-test',
    userTermName: () => 'user-term-name-test',
    index: () => 4
  }
}

export { termPlanSchema, termPlanResolver };