import client from "../client";

export default {
  Category: {
    totalShops: ({ name }) =>
      client.coffeeShop.count({
        where: { categories: { some: { name } } },
      }),
  },
};
