import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const ECHO_QUERY = gql`
  query {
    echo(text: "Hello World!")
  }
`;

interface EchoData {
  echo: string;
}

const ClientSideGraphqlPage = () => {
  const { loading, error, data } = useQuery<EchoData>(ECHO_QUERY);

  return (
    <Layout>
      <SEO title="ClientSideGraphql" />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && data && <div>{data.echo}</div>}
    </Layout>
  );
};

export default ClientSideGraphqlPage;
