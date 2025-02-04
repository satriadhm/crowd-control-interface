import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      role
      accessToken
      refreshToken
      userId
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      role
      accessToken
      refreshToken
      userId
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;