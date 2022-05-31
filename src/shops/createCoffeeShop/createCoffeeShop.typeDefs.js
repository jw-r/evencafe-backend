import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      categories: String
      avatar: Upload
    ): MutationResponse!
  }
`;
