import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
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

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
      title
    }
  }
`;
