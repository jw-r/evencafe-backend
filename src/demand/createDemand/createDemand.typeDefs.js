import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createDemand(payload: String!): MutationResponse!
  }
`;
