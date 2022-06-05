import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    followCoffeeShop: protectResolver(async (_, { name }, { loggedInUser }) => {
      const shop = client.coffeeShop.findUnique({
        where: { name },
        select: { id: true },
      });
      if (!shop) {
        return {
          ok: false,
          error: "해당 카페를 찾을 수 없습니다",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          followingShops: {
            connect: {
              name,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
