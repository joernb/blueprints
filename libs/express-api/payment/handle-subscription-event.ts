import Stripe from "stripe";
import { Context } from "../context";
import { assignRole } from "../users/assign-role";
import { unassignRole } from "../users/unassign-role";

/**
 * Updates user roles based on subscription status
 */
export const handleSubscriptionEvent = async (
  context: Context,
  subscription: Stripe.Subscription,
  deleted: boolean
): Promise<void> => {
  const customerId = subscription.customer as string;
  const productIds = subscription.items.data.map(
    (item) => item.price.product as string
  );

  // Get linked user for Stripe customer
  const customer = (await context.stripeClient.customers.retrieve(
    customerId
  )) as Stripe.Customer;
  const userId = customer.metadata.userId;

  if (!userId) {
    throw Error(`Could not find a linked user for customer ${customerId}.`);
  }

  // Get linked role names for Stripe product
  const roleNames = await Promise.all(
    productIds.map(async (productId) => {
      const product = await context.stripeClient.products.retrieve(productId);
      return product.metadata.role;
    })
  );

  // Adjust user roles
  await Promise.all(
    roleNames.map((roleName) =>
      deleted
        ? unassignRole(context, userId, roleName)
        : assignRole(context, userId, roleName)
    )
  );
};
