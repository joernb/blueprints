import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { getPermissionList } from "@my-org/express-api/permissions";
import React, { useMemo } from "react";
import { context } from "./context";

export interface Options {
  baseUrl: string;
  auth0: Auth0ProviderOptions;
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
  const auth0Options = useMemo(
    () => ({
      ...options.auth0,
      // Space separated list of permissions to request. All existing permissions are requested
      // but only those will be granted that are assigned to the user.
      scope: ["openid", "profile", "email", ...getPermissionList()].join(" "),
    }),
    [options]
  );
  return (
    <context.Provider value={contextInstance}>
      <Auth0Provider {...auth0Options}>{children}</Auth0Provider>
    </context.Provider>
  );
};

export default Provider;
