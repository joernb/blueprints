import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./hello";

(async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  // start app
  app.listen(port, () => {
    console.log(
      `Example app listening on port ${port}! GraphQL playground at /graphql.`
    );
  });
})();
