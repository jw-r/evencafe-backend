import client from "../../client";

export default {
  Query: {
    searchCoffeeShop: async (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          name: {
            startsWith: keyword,
          },
        },
        include: {
          user: true,
          photos: true,
        },
      }),
  },
};
