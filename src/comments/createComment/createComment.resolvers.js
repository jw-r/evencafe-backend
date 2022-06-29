import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    createComment: protectResolver(
      async (_, { shopId, payload }, { loggedInUser }) => {
        const ok = await client.coffeeShop.findUnique({
          where: {
            id: shopId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Shop not found",
          };
        }
        const newComment = await client.comment.create({
          data: {
            payload,
            shop: {
              connect: {
                id: shopId,
              },
            },
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
          },
        });
        return {
          ok: true,
          id: newComment.id,
        };
      }
    ),
  },
};
