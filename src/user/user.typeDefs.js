import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
    name: String!
    username: String!
    location: String
    avatarURL: String
    githubUsername: String
  }
`;
