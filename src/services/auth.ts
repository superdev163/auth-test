import { gql } from "@apollo/client";

export const login = gql`
  mutation Mutation($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      jwt
      user {
        _id
      }
    }
  }
`;

export const userDetail = gql`
  query User($userId: String) {
    user(userId: $userId) {
      firstName
      lastName
      companyName
      companyPosition
    }
  }
`;
