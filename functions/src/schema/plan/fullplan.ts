import { gql } from 'apollo-server-express';

const fullPlanSchema = gql`
  """
  A list of courses that a user plans to take in a certain order, organized by terms.
  """
  type FullPlan {
    id: ID!,
    author: User,
    "The number of users that have copied (forked) this plan"
    numForks: Int,
    "The programs for which this plan should cover requirements"
    programs: [Program],
    "The individual terms within the full plan"
    terms: [TermPlan],
    """
    The user's co-op sequence, or just the schedule in which they plan to take study terms.
    "STUDY" represents a study term, "WORK" represents a work term, "CHILL" represents a chill term.
    """
    sequence: [String]
  }
`

const fullPlanResolver = {
  FullPlan: {
    id: () => 'test-id',
    sequence: () => 'sequence-1'
  }
}

export { fullPlanSchema, fullPlanResolver };