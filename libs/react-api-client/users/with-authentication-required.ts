import { withAuthenticationRequired as auth0WithAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType, FC } from "react";

export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  permission?: string
): FC<P> =>
  auth0WithAuthenticationRequired(Component, {
    loginOptions: {
      // Encode current page url in app state. Will be handled by onRedirectCallback.
      appState: {
        returnTo: typeof window !== "undefined" ? window.location.href : "",
      },
    },
  });
