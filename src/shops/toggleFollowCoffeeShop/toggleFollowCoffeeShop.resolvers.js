import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    toggleFollowCoffeeShop: protectResolver(
      async (_, { name }, { loggedInUser }) => {
        const shop = await client.coffeeShop.findUnique({
          where: { name },
          select: { id: true },
        });
        if (!shop) {
          return {
            ok: false,
            error: "해당 카페를 찾을 수 없습니다",
          };
        }
        const isFollowing = await client.user.count({
          where: {
            id: loggedInUser.id,
            followingShops: {
              some: {
                name,
              },
            },
          },
        });
        if (!isFollowing) {
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
        } else {
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              followingShops: {
                disconnect: {
                  name,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
