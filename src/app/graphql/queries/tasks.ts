import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($skip: Int, $take: Int) {
    getTasks(args: { skip: $skip, take: $take }) {
      title
      question
      nAnswers
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
