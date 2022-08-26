import { ManagementClient } from "auth0";
import { AppMetadata, UserMetadata } from "../users/model";

export interface Options {
  domain: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Creates an Auth0 Management API client.
 * @see https://auth0.com/docs/api/management/v2
 */
export const managementClient = (options: Options) =>
  new ManagementClient<AppMetadata, UserMetadata>({
    ...options,
    scope: ["read:users", "update:users", "delete:users"].join(" "),
  });
