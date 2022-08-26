import { UserData, Permission as Auth0Permission } from "auth0";

export interface AppMetadata {}

export interface UserMetadata {}

export type User = UserData<AppMetadata, UserMetadata>;
export type Permission = Auth0Permission;
