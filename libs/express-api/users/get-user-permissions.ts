import { Context } from "../context";
import { Permission } from "./model";

export const getUserPermissions = async (
  context: Context,
  id: string
): Promise<Permission[]> => {
  const permissions = await context.auth0ManagementClient.getUserPermissions({
    id,
  });
  return permissions;
};
