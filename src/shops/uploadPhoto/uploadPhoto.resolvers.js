import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    uploadPhoto: protectResolver(async (_, { id, file }, { loggedInUser }) => {
      const ok = await client.coffeeShop.findUnique({
        where: { id },
        select: { userId: true, name: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "해당 커피숍을 찾을 수 없는디요..!?",
        };
      }
      if (ok.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "당신에게 권한이 없군요?",
        };
      }
      const fileUrl = await uploadToS3(
        file,
        loggedInUser.id,
        `shops/${ok.name}/photo`
      );
      const newPhoto = await client.coffeeShopPhoto.create({
        data: {
          url: fileUrl,
          shop: {
            connect: { id },
          },
        },
      });
      if (newPhoto) {
        return {
          ok: true,
        };
      }
    }),
  },
};
