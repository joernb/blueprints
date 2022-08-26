import { Context } from "../context";
import { User } from "./model";

export const getUser = async (context: Context, id: string): Promise<User> => {
  const user = await context.auth0ManagementClient.getUser({
    id,
  });
  return user;
};
