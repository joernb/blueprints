import { ApolloServer, gql } from "apollo-server";
import {
  typeDefs as helloTypeDefs,
  resolvers as helloResolvers,
} from "./hello";

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [helloTypeDefs],
  resolvers: [helloResolvers],
});

server
  .listen({
    port,
  })
  .then(({ url }) => {
    // tslint:disable-next-line: no-console
    console.log(`🚀 Server ready at ${url}`);
  });
