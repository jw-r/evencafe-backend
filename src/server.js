require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./utils";

const PORT = process.env.PORT || 4000;

(async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    },
  });
  await apollo.start();
  apollo.applyMiddleware({ app });
})();

const app = express();

app.listen({ port: PORT }, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
