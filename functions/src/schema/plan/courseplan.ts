import { gql } from 'apollo-server-express';

const coursePlanSchema = gql`
  """
  A wrapper for a specific course, that contains all the user's plan metadata for that course.
  """
  type CoursePlan {
    course: Course,
    "Any notes that the user has about the course"
    notes: String,
    "The index of the course in the TermPlan wrapper"
    index: Int
  }
`

const coursePlanResolver = {
  CoursePlan: {
    notes: () => 'notes-test',
    index: () => 3
  }
}

export { coursePlanSchema, coursePlanResolver };
