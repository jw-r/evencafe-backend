import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    toggleFollowCoffeeShop(name: String!): MutationResponse!
  }
`;
