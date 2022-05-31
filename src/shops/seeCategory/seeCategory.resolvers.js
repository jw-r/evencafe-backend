import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name, page }) => {
      const TAKE = 15;
      const totalShops = await client.coffeeShop.count({
        where: { categories: { some: { name } } },
      });
      if (page < 1) {
        return {
          totalPages: Math.ceil(totalShops / TAKE),
        };
      }
      const shops = await client.coffeeShop.findMany({
        where: { categories: { some: { name } } },
        take: TAKE,
        skip: (page - 1) * TAKE,
      });
      return {
        shops,
        totalPages: Math.ceil(totalShops / TAKE),
      };
    },
  },
};
