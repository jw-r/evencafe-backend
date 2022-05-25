import { hash } from "bcrypt";
import client from "../../client";
import { checkExisting, protectResolver } from "../../utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          email,
          name,
          username,
          password,
          location,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        try {
          // 유니크 보장되는지 확인
          let checkExist = null;
          if (email || username) {
            checkExist = await checkExisting(email, username);
          }
          if (checkExist) {
            return {
              ok: false,
              error: "이미 존재하는 이메일이거나, 사용중인 유저명입니다 ㅠ.ㅠ",
            };
          }
          // 해싱
          let hashedPassword = null;
          if (password) {
            hashedPassword = await hash(newPassword, 10);
          }
          // 업데이트
          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              email,
              name,
              username,
              ...(hashedPassword && { password: hashedPassword }),
            },
          });
          if (updatedUser.id) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: "프로필 정보를 업데이트하는데 실패했습니다 ㄷ.ㄷ",
            };
          }
        } catch {
          return {
            ok: false,
            error: "뭔가 잘못된거 같은데요!?",
          };
        }
      }
    ),
  },
};
