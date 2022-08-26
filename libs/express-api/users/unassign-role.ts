import { Context } from "../context";
import { UserId } from "./model";

export const unassignRole = async (
  context: Context,
  userId: UserId,
  roleName: string
) => {
  const foundRoles = await context.auth0ManagementClient.getRoles({
    name_filter: roleName,
  });

  const roleId = foundRoles[0]?.id;
  if (!roleId) {
    throw new Error(`Could not find role "${roleName}"`);
  }

  await context.auth0ManagementClient.removeRolesFromUser(
    { id: userId },
    { roles: [roleId] }
  );
};
