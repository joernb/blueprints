import "regenerator-runtime/runtime";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./hello";

const app = express();

// enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [],
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204 but work with 200
  })
);

export default app;

(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/", cors: false });
})();
