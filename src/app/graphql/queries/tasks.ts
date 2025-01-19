import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      title
      description
      question
      nAnswers
      answers {
        workerId
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
