import { Context } from "../context";
import { getUser } from "../users/get-user";
import { UserId } from "../users/model";
import { PortalSessionUrl } from "./model";

export const createPortalSession = async (
  context: Context,
  userId: UserId,
  returnUrl: string
): Promise<PortalSessionUrl> => {
  const user = await getUser(context, userId);
  const customerId = user.app_metadata?.customerId;
  if (!customerId) {
    throw Error("Could not find linked customer.");
  }

  const session = await context.stripeClient.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
};
