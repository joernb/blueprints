import { UpdateUserData } from "auth0";
import { Context } from "../context";
import { User } from "./model";

export const updateUser = async (
  context: Context,
  id: string,
  userData: UpdateUserData
): Promise<User> => {
  const user = await context.auth0ManagementClient.updateUser(
    {
      id,
    },
    userData
  );
  return user;
};
