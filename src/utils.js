import { verify } from "jsonwebtoken";
import client from "./client";

export const checkExisting = async (email = null, username = null) => {
  const existingUser = await client.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    return true;
  } else {
    return false;
  }
};

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "로그인 해 주쎄용!",
    };
  } else {
    return resolver(root, args, context, info);
  }
};
