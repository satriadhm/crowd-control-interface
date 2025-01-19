import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers($skip: Int, $take: Int) {
    getAllUsers(args: { skip: $skip, take: $take }) {
      firstName
      lastName
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
