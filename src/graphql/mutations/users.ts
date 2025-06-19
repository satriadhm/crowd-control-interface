import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      firstName
      lastName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      userName
      firstName
      lastName
      email
      role
      phoneNumber
      address1
      address2
    }
  }
`;

export const RESET_DONE_TASK = gql`
  mutation ResetHasDoneTask($id: String!) {
    resetHasDoneTask(id: $id) {
      id
      firstName
      lastName
      email
      role
      isEligible
      completedTasks {
        taskId
        answer
      }
    }
  }
`;
