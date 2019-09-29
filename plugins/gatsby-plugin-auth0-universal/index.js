import React, { useContext, useState, useCallback, useMemo } from "react";
import auth0 from "auth0-js";
import { navigate } from "gatsby";
import useAsyncCallback from "./use-async-callback";

export const AuthContext = React.createContext({
  userInfo: undefined,
  accessToken: undefined,
  error: undefined,
  authorize: () => undefined,
  parseHash: () => undefined,
  silentAuth: () => undefined,
  logout: () => undefined,
  updateUserMetadata: () => undefined,
});

const ensureBrowserEnvironment = () => {
  if (typeof window === "undefined") {
    throw new Error("Not in browser environment!");
  }
};

export const AuthProvider = ({ options, children }) => {
  const {
    domain,
    logoutUrl,
    silentAuthFlag = "silentAuth",
    redirectFlag = "redirect",
  } = options;

  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState();

  // the auth0 instance
  const auth0WebAuth = useMemo(
    () =>
      new auth0.WebAuth({
        ...options,
        responseType: "token id_token",
        audience: `https://${domain}/api/v2/`,
        // scope,
      }),
    []
  );

  const handleTokens = useCallback(
    (resolve, reject) => (err, result) => {
      try {
        if (err) {
          // console.error("HANDLE TOKENS AERROR", err);
          throw err.errorDescription;
        }
        setAccessToken(result.accessToken);
        localStorage.setItem(silentAuthFlag, "true");

        const redirectPath = localStorage.getItem(redirectFlag);
        if (redirectPath) {
          localStorage.removeItem(redirectFlag);
          navigate(redirectPath);
        }

        // if (!result.accessToken) {
        //   throw Error("Access token missing in response");
        // }

        const auth0Management = new auth0.Management({
          domain,
          token: result.accessToken,
        });
        auth0Management.getUser(result.idTokenPayload.sub, (err, result) => {
          if (!err) {
            setUserInfo(result);
            resolve(result);
          } else {
            reject(err);
          }
        });
      } catch (error) {
        reject(error);
      }
    },
    [domain, silentAuthFlag]
  );

  const authorize = useCallback(
    (params = {}) => {
      ensureBrowserEnvironment();
      localStorage.setItem(redirectFlag, window.location.pathname);
      auth0WebAuth.authorize(params);
    },
    [auth0WebAuth]
  );

  const parseHash = useAsyncCallback(
    (params = {}) =>
      new Promise((resolve, reject) => {
        ensureBrowserEnvironment();
        auth0WebAuth.parseHash(params, handleTokens(resolve, reject));
      }),
    [auth0WebAuth, handleTokens]
  );

  const silentAuth = useAsyncCallback(
    (params = {}) =>
      new Promise((resolve, reject) => {
        ensureBrowserEnvironment();
        if (localStorage.getItem(silentAuthFlag) === "true") {
          localStorage.setItem(silentAuthFlag, "false");
          auth0WebAuth.checkSession(params, handleTokens(resolve, reject));
        } else {
          reject("silentAuthFlag not set!");
        }
      }),
    [auth0WebAuth, handleTokens]
  );

  const logout = useCallback(
    (params = { returnTo: logoutUrl }) => {
      ensureBrowserEnvironment();
      localStorage.setItem(silentAuthFlag, "false");
      auth0WebAuth.logout(params);
    },
    [auth0WebAuth]
  );

  const patchUserMetadata = useAsyncCallback(
    (subject, metadata) =>
      new Promise((resolve, reject) => {
        new auth0.Management({
          domain,
          token: accessToken,
        }).patchUserMetadata(subject, metadata, (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      }),
    [accessToken]
  );

  // context api
  const provided = useMemo(
    () => ({
      userInfo,
      accessToken,
      authorize,
      parseHash,
      silentAuth,
      logout,
      patchUserMetadata,
    }),
    [
      userInfo,
      accessToken,
      authorize,
      parseHash,
      silentAuth,
      logout,
      patchUserMetadata,
    ]
  );

  return (
    <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
