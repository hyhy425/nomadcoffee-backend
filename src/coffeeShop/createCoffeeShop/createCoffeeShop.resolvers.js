import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, category }, { loggedInUser }) => {
        let categoryObj = [];
        if (category) {
          categoryObj = processCategories(category);
        }
        return client.coffeeShop.create({
          data: {
            name,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
          },
        });
      }
    ),
  },
};
