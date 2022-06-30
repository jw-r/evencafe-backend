import client from "../../client";

export default {
  Query: {
    seeComments: (_, { id }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .Comment({
          orderBy: {
            createdAt: "desc",
          },
          include: { user: true },
        }),
  },
};
