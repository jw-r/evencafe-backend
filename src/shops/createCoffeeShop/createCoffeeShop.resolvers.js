import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { processCategories, protectResolver } from "../../utils";

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { name, latitude, longitude, avatar, categories, adress, bio },
        { loggedInUser }
      ) => {
        try {
          const existingShop = await client.coffeeShop.findFirst({
            where: { name },
          });
          if (existingShop) {
            return {
              ok: false,
              error: "이미 등록 되어 있는 이름인걸요??",
            };
          }
          let avatarUrl = undefined;
          if (avatar) {
            avatarUrl = await uploadToS3(
              avatar,
              loggedInUser.id,
              `shops/${name}/avatar`
            );
          }
          let categoryObjs = [];
          if (categories) {
            categoryObjs = processCategories(categories);
          }
          const newShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              adress,
              avatar: avatarUrl,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoryObjs.length > 0 && {
                categories: {
                  connectOrCreate: categoryObjs,
                },
              }),
            },
          });
          if (newShop) {
            return {
              ok: true,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: "뭔가 문제가 일어났군..",
          };
        }
      }
    ),
  },
};
