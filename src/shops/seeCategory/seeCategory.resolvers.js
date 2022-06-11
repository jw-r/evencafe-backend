import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name, page }) => {
      const TAKE = 30;
      const totalShops = await client.coffeeShop.count({
        where: { categories: { some: { name } } },
      });
      if (page < 1) {
        return {
          totalPages: Math.ceil(totalShops / TAKE),
        };
      }
      const shops = await client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
        include: { user: true, photos: true, categories: true },
        take: TAKE,
        skip: (page - 1) * TAKE,
      });
      return {
        shops,
        totalShops,
        totalPages: Math.ceil(totalShops / TAKE),
      };
    },
  },
};
