import Provider, { Options } from "@my-org/react-api-client/provider";
import React, { useMemo } from "react";
import Navigation from "./navigation";

const App = () => {
  const options: Options = useMemo(
    () => ({
      baseUrl: process.env.REACT_NATIVE_API_BASE_URL,
    }),
    []
  );
  return (
    <Provider options={options}>
      <Navigation />
    </Provider>
  );
};

export default App;
