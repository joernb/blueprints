import bodyParser from "body-parser";
import { Router } from "express";
import Stripe from "stripe";
import { Context } from "../context";
import { UserId } from "../users/model";
import { checkIsUser } from "../util/check-is-user";
import { createCheckoutSession } from "./create-checkout-session";
import { createPortalSession } from "./create-portal-session";
import { getProducts } from "./get-products";
import { getSubscription } from "./get-subscription";
import { handleSubscriptionEvent } from "./handle-subscription-event";
import {
  CheckoutSessionId,
  PortalSessionUrl,
  PriceId,
  Product,
  Subscription,
} from "./model";

export interface CreateCheckoutSessionRequestParams {
  userId: UserId;
}

export interface CreateCheckoutSessionRequestBody {
  priceId: PriceId;
  returnUrl: string;
}

export interface CreateCheckoutSessionResponseBody {
  sessionId: CheckoutSessionId;
}

export interface CreatePortalSessionRequestParams {
  userId: UserId;
}

export interface CreatePortalSessionRequestBody {
  returnUrl: string;
}

export interface CreatePortalSessionResponseBody {
  sessionUrl: PortalSessionUrl;
}

export interface GetProductsRequestParams {
  userId: UserId;
}

export interface GetProductsResponseBody {
  products: Product[];
}

export interface GetSubscriptionRequestParams {
  userId: UserId;
}

export interface GetSubscriptionResponseBody {
  subscription: Subscription | undefined;
}

export const middleware = (context: Context) => {
  const routes = Router();

  routes.get<GetSubscriptionRequestParams, GetSubscriptionResponseBody>(
    "/subscription/:userId",
    checkIsUser("userId"),
    async (req, res) =>
      res.json({
        subscription: await getSubscription(context, req.params.userId),
      })
  );

  routes.get<GetProductsRequestParams, GetProductsResponseBody>(
    "/products/:userId",
    checkIsUser("userId"),
    async (req, res) =>
      res.json({
        products: await getProducts(context, req.params.userId),
      })
  );

  routes.post<
    CreateCheckoutSessionRequestParams,
    CreateCheckoutSessionResponseBody,
    CreateCheckoutSessionRequestBody
  >("/checkout/:userId", checkIsUser("userId"), async (req, res) =>
    res.json({
      sessionId: await createCheckoutSession(
        context,
        req.params.userId,
        req.body.priceId,
        req.body.returnUrl
      ),
    })
  );

  routes.post<
    CreatePortalSessionRequestParams,
    CreatePortalSessionResponseBody,
    CreatePortalSessionRequestBody
  >("/portal/:userId", checkIsUser("userId"), async (req, res) =>
    res.json({
      sessionUrl: await createPortalSession(
        context,
        req.params.userId,
        req.body.returnUrl
      ),
    })
  );

  routes.post(
    "/event",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      try {
        // https://stripe.com/docs/webhooks/signatures
        const event = context.stripeClient.webhooks.constructEvent(
          req.body,
          req.headers["stripe-signature"] as string,
          process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET || ""
        );

        switch (event.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
            await handleSubscriptionEvent(
              context,
              event.data.object as Stripe.Subscription,
              false
            );
            break;
          case "customer.subscription.deleted":
            await handleSubscriptionEvent(
              context,
              event.data.object as Stripe.Subscription,
              true
            );
            break;
        }

        res.status(200).json({
          received: true,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json("Error during Stripe webhook handling.");
      }
    }
  );

  return routes;
};
