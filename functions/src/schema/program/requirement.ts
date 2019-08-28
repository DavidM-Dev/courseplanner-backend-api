import { gql } from 'apollo-server-express';

const requirementSchema = gql`
  """
  There are two general types of requirements:
  1) Take N courses from [X, Y, Z]
  2) Take all courses from [X, Y, Z]

  The condition is usually:
  1) Take {courses above} before a specific term number (e.g. 4A -> 7)

  Each set of courses can be represented by a single course code, a range of course codes,
  or any kind of elective (we should use regex-ish expressions).
  """
  type Requirement {  
    "An optional string describing the requirement details"
    description: String,
    "The courses which need to be completed. This could be a range of courses, so these strings are represented as regex-ish expressions."
    coursesAffected: [String],
    "The number of courses which need to be fulfilled from the coursesAffected list, before the condition is complete. -1 represents all of the courses"
    numCoursesAffected: Int,
    "The term number by which this needs to be completed. Null value means that it needs to be completed before graduation"
    completedBy: Int  
  }
`

const requirementResolver = {
  Requirement: {
    description: () => 'description-test',
    coursesAffected: () => ['hello'],
    numCoursesAffected: () => 3,
    completedBy: () => 9
  }
}

export { requirementSchema, requirementResolver };