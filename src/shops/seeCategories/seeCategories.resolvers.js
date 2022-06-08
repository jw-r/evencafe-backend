import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page }) => {
      const TAKE = 15;
      const totalCategories = await client.category.count();
      if (page < 1) {
        return {
          totalPages: Math.ceil(totalCategories / TAKE),
        };
      }
      const categories = await client.category.findMany({
        take: 15,
        skip: (page - 1) * 15,
      });
      return {
        totalPages: Math.ceil(totalCategories / TAKE),
        totalCategories,
        categories,
      };
    },
  },
};
