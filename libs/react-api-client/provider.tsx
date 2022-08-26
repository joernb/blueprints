import React, { useMemo } from "react";
import { context } from "./context";

export interface Options {
  baseUrl: string;
}

interface Props {
  children?: React.ReactNode;
  options: Options;
}

const Provider = ({ children, options }: Props) => {
  const contextInstance = useMemo(
    () => ({
      baseUrl: options.baseUrl,
    }),
    [options]
  );
  return (
    <context.Provider value={contextInstance}>{children}</context.Provider>
  );
};

export default Provider;
