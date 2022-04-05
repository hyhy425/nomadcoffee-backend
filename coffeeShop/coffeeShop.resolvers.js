import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }) =>
      client.Category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
    photos: ({ id }) => client.CoffeeShopPhoto.count({ where: { shopId: id } }),
  },
  Category: {
    shops: ({ id }) => {
      return client.name
        .findUnique({
          where: {
            id,
          },
        })
        .shops();
    },
    totalShops: ({ id }) =>
      client.CoffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
