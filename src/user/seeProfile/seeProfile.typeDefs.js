import { gql } from "apollo-server";

export default gql`
  type User {
    username: String!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
