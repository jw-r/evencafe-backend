import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { offset }) => {
      const TAKE = 20;
      // const totalShops = await client.coffeeShop.count();
      // if (page < 1) {
      //   return {
      //     totalPages: Math.ceil(totalShops / TAKE),
      //   };
      // }
      const shops = await client.coffeeShop.findMany({
        take: TAKE,
        skip: offset,
        include: {
          user: true,
          categories: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return shops;
    },
  },
};
