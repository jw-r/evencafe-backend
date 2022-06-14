import client from "../client";

export default {
  CoffeeShop: {
    followers: async ({ id }) => {
      const shop = await client.user.count({
        where: { followingShops: { some: { id } } },
      });
      return shop;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      try {
        const exists = await client.user.count({
          where: {
            id: loggedInUser.id,
            followingShops: {
              some: {
                id,
              },
            },
          },
        });
        return Boolean(exists);
      } catch (e) {
        console.log(e);
      }
    },
  },
  Category: {
    totalShops: ({ name }) =>
      client.coffeeShop.count({
        where: { categories: { some: { name } } },
      }),
  },
};
