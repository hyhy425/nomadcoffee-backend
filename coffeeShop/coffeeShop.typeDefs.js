import { gql } from "apollo-server";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User!
    categories: [Category]
    photos: [CoffeeShopPhoto]
    created_at: String!
    updated_at: String!
  }
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
    created_at: String!
    updated_at: String!
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop
    created_at: String!
    updated_at: String!
  }
`;
