import Provider, { Options } from "@my-org/react-api-client/provider";
import { AppProps } from "next/app";
import router from "next/router";
import { useMemo } from "react";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => {
  const options: Options = useMemo(
    () => ({
      baseUrl: `/api`,
      auth0: {
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
        clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
        audience: process.env.NEXT_PUBLIC_JWT_AUDIENCE,
        // Redirect to index page which will trigger onRedirectCallback
        redirectUri: `${
          typeof window !== "undefined" ? window.location.origin : ""
        }${"/"}`,
        // https://auth0.com/docs/security/data-security/token-storage#browser-local-storage-scenarios
        cacheLocation: "localstorage",
        // Customize redirect behavior after login
        onRedirectCallback: (appState) => {
          router.replace(appState?.returnTo || window.location.pathname);
        },
      },
      stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      },
    }),
    []
  );

  return (
    <Provider options={options}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
