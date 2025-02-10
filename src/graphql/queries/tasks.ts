import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetAllTasks($question: String, $skip: Float, $take: Float) {
    getTasks(question: $question, skip: $skip, take: $take) {
      id
      title
      question
      description
      nAnswers
      answers {
        answer
        stats
      }
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
      title
      question
      answers {
        workerId
        answer
        stats
      }
    }
  }
`;
