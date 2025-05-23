import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetAllTasks($question: String, $skip: Float, $take: Float) {
    getTasks(question: $question, skip: $skip, take: $take) {
      id
      title
      question {
        scenario
        given
        when
        then
      }
      isValidQuestion
      description
      nAnswers
      answers {
        answerId
        answer
        stats
      }
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
      id
      title
      question {
        scenario
        given
        when
        then
      }
      description
      nAnswers
      answers {
        answerId
        answer
        stats
      }
    }
  }
`;

export const GET_TOTAL_TASKS = gql`
  query GetTotalTasks {
    getTotalTasks
  }
`;
