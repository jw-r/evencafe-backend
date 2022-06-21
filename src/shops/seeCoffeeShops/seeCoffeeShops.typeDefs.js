import { gql } from "apollo-server-express";

export default gql`
  type SeeCoffeeShopsResult {
    shops: [CoffeeShop]
    totalPages: Int!
  }
  type Query {
    # seeCoffeeShops(offset: Int!): SeeCoffeeShopsResult!
    seeCoffeeShops(offset: Int!): [CoffeeShop]
  }
`;
