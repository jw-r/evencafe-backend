import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    unfollowUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!user) {
        return {
          ok: false,
          error: "해당 유저를 찾을 수 없습니다",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
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
