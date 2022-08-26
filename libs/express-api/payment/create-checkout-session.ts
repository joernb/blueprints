import { Context } from "../context";
import { getUser } from "../users/get-user";
import { UserId } from "../users/model";
import { updateUser } from "../users/update-user";
import { CheckoutSessionId, PriceId } from "./model";

export const createCheckoutSession = async (
  context: Context,
  userId: UserId,
  priceId: PriceId,
  returnUrl: string
): Promise<CheckoutSessionId> => {
  const user = await getUser(context, userId);
  let customerId = user.app_metadata?.customerId;

  if (!customerId) {
    // No linked customer found, creating a new one
    const customer = await context.stripeClient.customers.create({
      email: user.email,
      metadata: {
        userId,
      },
    });
    customerId = customer.id;

    // Connect Auth0 profile to Stripe customer
    await updateUser(context, userId, {
      app_metadata: {
        customerId,
      },
    });
  }

  // Fetch active tax rate ids
  const { data: taxRates } = await context.stripeClient.taxRates.list({
    limit: 100,
    active: true,
  });
  const taxRateIds = taxRates.map((taxRate) => taxRate.id);

  // Creating checkout session for customer
  // https://stripe.com/docs/api/checkout/sessions/create
  const checkoutSession = await context.stripeClient.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        dynamic_tax_rates: taxRateIds,
        quantity: 1,
      },
    ],
    success_url: returnUrl,
    cancel_url: returnUrl,
  });
  return checkoutSession.id;
};
