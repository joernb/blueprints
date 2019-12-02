import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { RouteComponentProps } from "@reach/router";

const ECHO_QUERY = gql`
  query {
    echo(text: "Hello World!")
  }
`;

interface EchoData {
  echo: string;
}

type Props = RouteComponentProps;

const GraphqlTemplate = ({}: Props) => {
  const echoQuery = useQuery<EchoData>(ECHO_QUERY);

  return (
    <Layout>
      <SEO title="ClientSideGraphql" />
      {echoQuery.loading && <div>Loading...</div>}
      {echoQuery.error && <div>Error: {echoQuery.error.toString()}</div>}
      {!echoQuery.loading && !echoQuery.error && echoQuery.data && (
        <div>{echoQuery.data.echo}</div>
      )}
    </Layout>
  );
};

export default GraphqlTemplate;
