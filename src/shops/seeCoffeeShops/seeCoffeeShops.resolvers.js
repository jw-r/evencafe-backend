import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const TAKE = 10;
      const totalShops = await client.coffeeShop.count();
      if (page < 1) {
        return {
          totalPages: Math.ceil(totalShops / TAKE),
        };
      }
      const shops = await client.coffeeShop.findMany({
        take: TAKE,
        skip: (page - 1) * TAKE,
        include: {
          user: true,
          categories: true,
        },
      });
      return {
        shops,
        totalPages: Math.ceil(totalShops / TAKE),
      };
    },
  },
};
