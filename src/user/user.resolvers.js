import client from "../client";
import { protectResolver } from "../utils";

export default {
  User: {
    followers: async (_, { username, lastId }) => {
      const ok = await client.user.findMany({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followers = await client.user
        .findUnique({
          where: { username },
        })
        .followers({
          take: 20,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        result: followers,
      };
    },
    following: async (_, { username, lastId }) => {
      const ok = await client.user.findMany({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 20,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        result: following,
      };
    },
    totalFollowing: async ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    totalFollowers: async ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),
  },
};
