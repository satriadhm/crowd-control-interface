import { gql } from '@apollo/client';

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser($token: String!) {
    me(token: $token) {
      id
      isEligible
      isDoneTaskIds
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
