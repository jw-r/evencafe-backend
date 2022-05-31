import { gql } from "apollo-server";

export default gql`
  type FollowResult {
    ok: Boolean!
    error: String
    result: [User]
  }
  type User {
    id: Int!
    email: String!
    name: String!
    username: String!
    location: String
    avatarURL: String
    githubUsername: String
    totalFollowing: Int!
    totalFollowers: Int!
    followers(username: String!, lastId: Int): FollowResult!
    following(username: String!, lastId: Int): FollowResult!
    createdAt: String!
    updatedAt: String!
  }
`;
