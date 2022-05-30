import { gql } from "apollo-server-express";

export default gql`
  type SeeProfileResult {
    user: User
    error: String
  }
  type Query {
    seeProfile(id: Int, username: String): SeeProfileResult!
  }
`;
