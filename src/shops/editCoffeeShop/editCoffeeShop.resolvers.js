import client from "../../client";
import { deleteFromS3, uploadToS3 } from "../../shared/shared.utils";
import { processCategories, protectResolver } from "../../utils";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, avatar, categories, adress, bio },
        { loggedInUser }
      ) => {
        try {
          // 커피 숍이 존재하는지 확인
          const shop = await client.coffeeShop.findUnique({
            where: { id },
            include: { categories: { select: { name: true } } },
          });
          if (!shop) {
            return {
              ok: false,
              error: "해당 카페를 찾을 수 없어요!",
            };
          }
          // 커피샵을 수정할 권한이 있는지 확인
          if (shop.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "당신에겐 이 카페를 수정할 권한이 없어요!",
            };
          }
          if (name) {
            const existingShop = await client.coffeeShop.findFirst({
              where: { name },
            });
            if (existingShop) {
              return {
                ok: false,
                error: "이미 등록 되어 있는 이름인걸요??",
              };
            }
          }
          let avatarUrl = undefined;
          // 이전 아바타 삭제 후 새로운 아바타 주소 넣기
          if (avatar) {
            const pre_avatarUrl = await client.coffeeShop.findUnique({
              where: { id },
              select: { name: true, avatar: true },
            });
            if (pre_avatarUrl) {
              await deleteFromS3(
                pre_avatarUrl.avatar,
                `shops/${pre_avatarUrl.name}/avatar`
              );
            }
            avatarUrl = await uploadToS3(
              avatar,
              loggedInUser.id,
              `shops/${name ? name : shop.name}/avatar`
            );
          }
          let categoryObjs = [];
          // 이전 카테고리와 연결 끊고 새로운 카테고리와 연결
          if (categories) {
            categoryObjs = processCategories(categories);
          }
          const updatedShop = await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              adress,
              bio,
              ...(avatar && { avatar: avatarUrl }),
              ...(categoryObjs.length > 0 && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: categoryObjs,
                },
              }),
            },
          });
          // 카테고리에 속한 커피숍이 0개라면 해당 카테고리 삭제
          // await client.category.deleteMany({
          //   where: { shops: { none: { id } } },
          // });
          if (updatedShop) {
            return {
              id: updatedShop.id,
              ok: true,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: "업데이트를 못했어용..",
          };
        }
      }
    ),
  },
};
