import { gql } from "apollo-server-express";

export default gql`
  type SeeProfileResult {
    ok: User
    error: String
  }
  type Query {
    seeProfile(id: Int, username: String): SeeProfileResult!
  }
`;
