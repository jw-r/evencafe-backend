import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User!
    avatar: String
    photos: [CoffeeShopPhoto]
    categories: [Category]
    createdAt: String!
    updatedAt: String!
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    createdAt: String!
    updatedAt: String!
  }
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
