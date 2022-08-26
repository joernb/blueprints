import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = useCallback(
    () =>
      loginWithRedirect({
        // Encode current page url in app state. Will be handled by onRedirectCallback.
        appState: {
          returnTo: typeof window !== "undefined" ? window.location.href : "",
        },
      }),
    [loginWithRedirect]
  );

  const logout = useCallback(
    () =>
      auth0Logout({
        // Redirect to index page
        returnTo: typeof window !== "undefined" ? window.location.origin : "",
      }),
    [auth0Logout]
  );

  return {
    user,
    isAuthenticated,
    login,
    logout,
    getAccessTokenSilently,
  };
};
