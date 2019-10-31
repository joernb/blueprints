import { ApolloServer, gql } from "apollo-server";

const port = process.env.PORT || 4000;

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({
    port,
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
