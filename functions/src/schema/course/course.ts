import { gql } from 'apollo-server-express';

const courseSchema = gql`
  type Course {
    "The full course title (e.g. 'Logic and Computation (Enriched)')"
    title: String,
    "The course code, with appropriate spacing (e.g. 'CS 245E')"
    courseCode: String,
    "The first part of the course code (e.g. 'CS')"
    courseCategory: String,
    "The second part of the course code (e.g. '245E')"
    courseNum: String, 
    "The url to the course calendar entry for this course"
    calendarUrl: String,

    # TODO: probably need a lot more stuff here
    
    "The seasons that this course is usually offered (F/W/S)"
    termsUsuallyOffered: [String],
    "The terms when we *know* it will be offered (e.g. 'Fall 2019', 'Winter 2020')"
    termsActuallyOffered: [String]
  }
`

const courseResolver = {
  Course: {
    title: () => 'Logic and Computation (Enriched)',
    courseCode: () => 'CS 245E',
    courseCategory: () => 'CS',
    courseNum: () => '245E',
    calendarUrl: () => 'https://google.com',
    termsUsuallyOffered: () => [],
    termsActuallyOffered: () => []
  }
}

export { courseSchema, courseResolver };

