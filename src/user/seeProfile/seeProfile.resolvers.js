import client from "../../client";

const error = "해당 유저를 찾지 못했습니다 하핫..존재하지 않는듯?";

export default {
  Query: {
    seeProfile: async (_, { id, username }) => {
      if (id) {
        const user = await client.user.findUnique({ where: { id } });
        if (user) {
          return {
            user,
          };
        } else {
          return {
            error,
          };
        }
      } else if (username) {
        const user = await client.user.findUnique({ where: { username } });
        if (user) {
          return {
            user,
          };
        } else {
          return {
            error,
          };
        }
      } else {
        return {
          error,
        };
      }
    },
  },
};
