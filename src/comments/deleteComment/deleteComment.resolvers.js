import client from "../../client";
import { protectResolver } from "../../utils";

export default {
  Mutation: {
    deleteComment: protectResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: {
          id,
        },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "해당 댓글을 찾을 수 없습니다",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "해당 댓글을 삭제 할 권한이 없습니다",
        };
      } else {
        await client.comment.delete({ where: { id } });
      }
      return {
        ok: true,
      };
    }),
  },
};
