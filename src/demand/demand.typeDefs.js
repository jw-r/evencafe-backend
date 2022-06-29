import { gql } from "apollo-server-express";

export default gql`
  type Demand {
    id: Int!
    username: String
    payload: String!
    createdAt: String!
    updatedAt: String!
  }
`;
