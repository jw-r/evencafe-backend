import client from "../../client";
import bcrypt from "bcrypt";
import { checkExisting } from "../../utils";

export default {
  Mutation: {
    createAccount: async (
      _,
      { email, name, username, password, location, avatarURL, githubUsername }
    ) => {
      const checkExist = await checkExisting(email, username);
      if (checkExist) {
        return {
          ok: false,
          error: "이미 존재하는 이메일이거나, 사용중인 유저명입니다 ㅠ.ㅠ",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await client.user.create({
        data: {
          email,
          name,
          username,
          password: hashedPassword,
          location,
          avatarURL,
          githubUsername,
        },
      });
      if (newUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "힝.. 계정을 생성하지 못했습니다",
        };
      }
    },
  },
};
