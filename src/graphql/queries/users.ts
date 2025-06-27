import { gql } from '@apollo/client';


export const GET_ALL_USERS = gql`
  query GetAllUsers($skip: Float, $take: Float) {
    getAllUsers(skip: $skip, take: $take) {
      id
      firstName
      lastName
      completedTasks{answer,taskId}
      email
      role
    }
  }
`;


export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      firstName
      lastName
      email
      role
    }
  }
`;


export const GET_TOTAL_USERS = gql`
  query GetTotalUsers {
    getTotalUsers
  }
`;