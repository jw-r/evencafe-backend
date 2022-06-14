import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "이런 유저명은 존재하지 않는다고??",
        };
      }
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        return {
          ok: false,
          error: "비밀번호가 틀리다구..",
        };
      }
      const token = sign(
        { id: user.id, username: user.username },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
