import { gql } from 'apollo-server-express';
import { courseResolver, courseSchema } from './course/course';
import { coursePlanResolver, coursePlanSchema } from './plan/courseplan';
import { fullPlanResolver, fullPlanSchema } from './plan/fullplan';
import { termPlanResolver, termPlanSchema } from './plan/termplan';
import { programResolver, programSchema } from './program/program';
import { requirementResolver, requirementSchema } from './program/requirement';
import { userResolver, userSchema } from './user';


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

export const typeDefs = [linkSchema, userSchema, fullPlanSchema, courseSchema, programSchema, 
  requirementSchema, coursePlanSchema, termPlanSchema];

export const resolvers = [userResolver, fullPlanResolver, courseResolver, programResolver, 
  requirementResolver, coursePlanResolver, termPlanResolver];
