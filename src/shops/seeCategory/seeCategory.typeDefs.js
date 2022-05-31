import { gql } from "apollo-server-express";

export default gql`
  type SeeCategoryResult {
    totalPages: Int!
    shops: [CoffeeShop]
  }
  type Query {
    seeCategory(name: String!, page: Int!): SeeCategoryResult!
  }
`;
