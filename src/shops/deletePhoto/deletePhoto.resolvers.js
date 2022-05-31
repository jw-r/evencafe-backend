import client from "../../client";
import { deleteFromS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    deletePhoto: protectResolver(async (_, { id }, { loggedInUser }) => {
      const ok = await client.coffeeShopPhoto.findUnique({ where: { id } });
      const user = await client.coffeeShop.findFirst({
        where: { id: ok.shopId },
        select: { userId: true, name: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "해당 사진을 찾을 수 없어요ㅠㅠ",
        };
      } else if (user.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "당신에게 사진을 삭제할 권한이 없군요!?",
        };
      }
      await deleteFromS3(ok.url, `shops/${user.name}/photo`);
      await client.coffeeShopPhoto.delete({ where: { id } });
      return {
        ok: true,
      };
    }),
  },
};
