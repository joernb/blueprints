import Provider, { Options } from "@my-org/react-api-client/provider";
import { AppProps } from "next/app";
import { useMemo } from "react";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => {
  const options: Options = useMemo(
    () => ({
      baseUrl: `/api`,
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
