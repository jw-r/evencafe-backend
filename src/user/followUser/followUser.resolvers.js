import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
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