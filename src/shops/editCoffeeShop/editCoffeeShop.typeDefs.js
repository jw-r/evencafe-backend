import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      bio: String
      adress: String
      name: String
      latitude: String
      longitude: String
      categories: String
      avatar: Upload
    ): MutationResponse!
  }
`;
