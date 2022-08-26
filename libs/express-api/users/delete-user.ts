import { Context } from "../context";

export const deleteUser = async (
  context: Context,
  id: string
): Promise<string> => {
  await context.auth0ManagementClient.deleteUser({
    id,
  });
  return id;
};
