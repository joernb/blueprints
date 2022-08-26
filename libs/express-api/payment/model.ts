import Stripe from "stripe";

export type Subscription = Stripe.Subscription;
export type Price = Stripe.Price;

export interface Product {
  id: Stripe.Product["id"];
  name: Stripe.Product["name"];
  description: Stripe.Product["description"];
  images: Stripe.Product["images"];
  order: number;
  prices: Stripe.Price[];
}

export type PriceId = string;
export type CheckoutSessionId = string;
export type PortalSessionUrl = string;
