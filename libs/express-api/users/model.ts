import { UserData, Permission as Auth0Permission } from "auth0";

export interface AppMetadata {
  customerId: string;
}

export interface UserMetadata {}

export type UserId = string;
export type User = UserData<AppMetadata, UserMetadata>;
export type Permission = Auth0Permission;
