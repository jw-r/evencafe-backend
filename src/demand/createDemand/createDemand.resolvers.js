import client from "../../client";

export default {
  Mutation: {
    createDemand: async (_, { payload }, { loggedInUser }) => {
      const newDemand = await client.demand.create({
        data: {
          payload,
          ...(loggedInUser && { username: loggedInUser?.username }),
        },
      });
      if (!newDemand) {
        return {
          ok: false,
          error: "뭔가 문제가 생겼는걸요 ㅠㅠ",
        };
      }
      return {
        ok: true,
      };
    },
  },
};
