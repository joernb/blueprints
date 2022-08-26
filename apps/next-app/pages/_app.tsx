import Provider, { Options } from "@my-org/react-api-client/provider";
import { AppProps } from "next/app";
import { useMemo } from "react";
import "./_app.css";

// Code snippet to inject New Relic Browser Agent, defined in next.config.js
const newRelicCodeSnippet = process.env.NEW_RELIC_CODE_SNIPPET;

const App = ({ Component, pageProps }: AppProps) => {
  const options: Options = useMemo(
    () => ({
      baseUrl: `/api`,
    }),
    []
  );

  return (
    <Provider options={options}>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: newRelicCodeSnippet }}
      ></script>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
