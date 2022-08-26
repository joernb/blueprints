import Stripe from "stripe";

export interface Options {
  secretKey: string;
}

/**
 * Creates a Stripe API client.
 */
export const stripeClient = (options: Options): Stripe =>
  new Stripe(options.secretKey, {
    // https://stripe.com/docs/api/versioning?lang=node
    apiVersion: "2020-08-27",
  });
