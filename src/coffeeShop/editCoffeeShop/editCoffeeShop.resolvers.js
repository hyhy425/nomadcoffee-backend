import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, name, category }, { loggedInUser }) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        let categoryObjs = [];
        if (category) {
          categoryObjs = processCategories(category);
        }
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            ...(categoryObjs.length > 0 && {
              categories: {
                disconnect: oldShop.categories,
                connectOrCreate: categoryObjs,
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
