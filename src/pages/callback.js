import React, { useEffect } from "react";
import { useAuth } from "../../plugins/gatsby-plugin-auth0-universal";
import Layout from "../components/layout";
import SEO from "../components/seo";

const CallbackPage = () => {
  const { parseHash } = useAuth();
  useEffect(() => {
    parseHash.fn();
  }, []);
  return (
    <Layout>
      <SEO title="Callback" />
      {parseHash.error && (
        <>
          <h2>Error</h2>
          <p>{parseHash.error}</p>
        </>
      )}
    </Layout>
  );
};

export default CallbackPage;
