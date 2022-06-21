import client from "../../client";
import { deleteFromS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      const ok = await client.coffeeShop.findUnique({
        where: { id },
        select: {
          userId: true,
          avatar: true,
          name: true,
          photos: { select: { url: true } },
        },
      });
      if (!ok) {
        return {
          ok: false,
          error: "해당 카페를 찾을 수 없어용..ㄷ",
        };
      } else if (ok.userId !== loggedInUser?.id) {
        return {
          ok: false,
          error: "당신에게 카페를 삭제할 권한이 없군요!?",
        };
      }
      if (ok?.avatar) {
        await deleteFromS3(ok?.avatar, `shops/${ok?.name}/avatar`);
      }
      if (ok?.photos) {
        ok?.photos?.map(async (photo) => {
          await deleteFromS3(photo?.url, `shops/${ok?.name}/photo`);
        });
      }
      await client.coffeeShop.delete({ where: { id } });
      // 카테고리에 속한 커피숍이 0개라면 해당 카테고리 삭제
      await client.category.deleteMany({
        where: { shops: { none: {} } },
      });
      return {
        ok: true,
      };
    }),
  },
};
