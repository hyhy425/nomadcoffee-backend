import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCoffeeShop(name: String!, category: String): CoffeeShop
  }
`;
