import React, { useCallback } from "react";
import { useAuth } from "../../../plugins/gatsby-plugin-auth0-universal";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const LoginPage = () => {
  const { authorize, logout, idTokenPayload, silentAuth } = useAuth();

  const onLogin = useCallback(() => {
    authorize({});
  }, []);

  const onLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <Layout>
      <SEO title="Login" />

      {silentAuth.loading && <p>Authenticating...</p>}

      {!silentAuth.loading && !idTokenPayload && (
        <div>
          <h2>Logged out</h2>
          <button onClick={onLogin}>Login</button>
        </div>
      )}
      {!silentAuth.loading && idTokenPayload && (
        <div>
          <h2>Logged in</h2>
          <p>User ID: {idTokenPayload.sub}</p>
          <p>Name: {idTokenPayload.name}</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </Layout>
  );
};

export default LoginPage;
