/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

if (!process.env.GATSBY_APOLLO_CLIENT_URI) {
  throw Error("Missing environment variable GATSBY_APOLLO_CLIENT_URI");
}

export const wrapRootElement = ({ element }, { options }) => {
  const client = new ApolloClient({
    uri: process.env.GATSBY_APOLLO_CLIENT_URI,
  });

  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
