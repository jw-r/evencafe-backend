import client from "../client";

export default {
  CoffeeShop: {
    followers: async ({ id }) => {
      const shop = await client.user.count({
        where: { followingShops: { some: { id } } },
      });
      return shop;
    },
  },
  Category: {
    totalShops: ({ name }) =>
      client.coffeeShop.count({
        where: { categories: { some: { name } } },
      }),
  },
};
