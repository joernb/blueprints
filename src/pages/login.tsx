import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useAuth } from "../../plugins/gatsby-plugin-auth0-universal";
import Layout from "../components/layout";
import SEO from "../components/seo";

const LoginPage = () => {
  const {
    authorize,
    logout,
    userInfo,
    accessToken,
    silentAuth,
    patchUserMetadata,
  } = useAuth();

  const onLogin = useCallback(() => {
    authorize();
  }, []);

  const onLogout = useCallback(() => {
    logout();
  }, []);

  const [metadata, setMetadata] = useState({
    favoriteColor: "",
  });

  const onChangeMetadata = useMemo(
    () =>
      Object.keys(metadata).reduce<{ [key: string]: (event: any) => void }>(
        (obj, key) => ({
          ...obj,
          [key]: (event: any) =>
            setMetadata({
              ...metadata,
              [key]: event.target.value,
            }),
        }),
        {}
      ),
    [metadata]
  );

  const onSave = useCallback(() => {
    if (userInfo) {
      patchUserMetadata.execute(userInfo.user_id, metadata);
    }
  }, [userInfo, metadata]);

  useEffect(() => {
    silentAuth.execute();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.user_metadata) {
      setMetadata({
        ...metadata,
        ...userInfo.user_metadata,
      });
    }
  }, [userInfo]);

  return (
    <Layout>
      <SEO title="Login" />

      {silentAuth.loading && <p>Authenticating...</p>}

      {!silentAuth.loading && !userInfo && (
        <>
          <h2>Logged out</h2>
          <button onClick={onLogin}>Login</button>
        </>
      )}
      {!silentAuth.loading && userInfo && (
        <>
          <h2>Logged in</h2>
          <p>User ID: {userInfo.user_id}</p>
          <p>Username: {userInfo.name}</p>
          <p>
            <label>Favorite Color: </label>
            <input
              type="text"
              value={metadata.favoriteColor}
              onChange={onChangeMetadata.favoriteColor}
            />
          </p>
          <button onClick={onSave} disabled={patchUserMetadata.loading}>
            {patchUserMetadata.loading ? "Saving..." : "Save"}
          </button>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </Layout>
  );
};

export default LoginPage;
