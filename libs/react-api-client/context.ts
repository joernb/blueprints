import React from "react";
import { Stripe, StripeConstructorOptions } from "@stripe/stripe-js";

export interface Context {
  baseUrl: string;
  stripe: {
    publishableKey: string;
    options: StripeConstructorOptions;
  };
}

export const context = React.createContext<Context>({
  baseUrl: "",
  stripe: undefined,
});
