import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./hello";

const app = express();
export default app;

(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });
})();
