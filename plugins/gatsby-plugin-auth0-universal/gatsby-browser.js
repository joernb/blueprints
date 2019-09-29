import React from "react";
import { AuthProvider } from ".";

export const wrapRootElement = ({ element }, options) => (
  <AuthProvider options={options}>{element}</AuthProvider>
);
