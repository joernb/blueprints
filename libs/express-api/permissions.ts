import { permissions as itemsPermissions } from "./items/model";

export const permissions = {
  ...itemsPermissions,
};

export const getPermissionList = (): string[] => Object.values(permissions);
