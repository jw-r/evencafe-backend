import client from "../../client";

export default {
  Query: {
    searchUser: async (_, { keyword }) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
