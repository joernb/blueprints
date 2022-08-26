import React from "react";

export interface Context {
  baseUrl: string;
}

export const context = React.createContext<Context>({
  baseUrl: "",
});
