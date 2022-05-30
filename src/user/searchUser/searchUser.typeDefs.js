import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchUser(keyword: String): [User]
  }
`;
