import { gql } from "apollo-server-express";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      email: String!
      name: String!
      username: String!
      password: String!
      location: String
      avatarURL: String
      githubUsername: String
    ): CreateAccountResult!
  }
`;
