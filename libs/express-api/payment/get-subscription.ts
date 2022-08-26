import { Context } from "../context";
import { getUser } from "../users/get-user";
import { UserId } from "../users/model";
import { Subscription } from "./model";

export const getSubscription = async (
  context: Context,
  userId: UserId
): Promise<Subscription | undefined> => {
  // Fetch customerId from user metadata
  const user = await getUser(context, userId);
  const customerId = user.app_metadata
    ? user.app_metadata.customerId
    : undefined;

  if (customerId) {
    // Find subscription for customerId
    const { data: subscriptions } =
      await context.stripeClient.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });

    return subscriptions[0];
  } else {
    return undefined;
  }
};
