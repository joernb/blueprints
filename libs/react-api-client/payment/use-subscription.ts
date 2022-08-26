import {
  CreateCheckoutSessionRequestBody,
  CreateCheckoutSessionResponseBody,
  CreatePortalSessionRequestBody,
  CreatePortalSessionResponseBody,
  GetProductsResponseBody,
  GetSubscriptionResponseBody,
} from "@my-org/express-api/payment/middleware";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { context } from "../context";
import { useAuth } from "../users/use-auth";
import { fetchJson } from "../util/fetch-json";
import { useAsync } from "../util/use-async";

export const useSubscription = (userId: string) => {
  const { baseUrl, stripe: stripeContext } = useContext(context);
  const { user, getAccessTokenSilently } = useAuth();
  const router = useRouter();

  const getProducts = useAsync<void, GetProductsResponseBody>(async () =>
    fetchJson(
      "GET",
      `${baseUrl}/payment/products/${userId}`,
      undefined,
      await getAccessTokenSilently()
    )
  );

  const getSubscription = useAsync<void, GetSubscriptionResponseBody>(
    async () =>
      fetchJson(
        "GET",
        `${baseUrl}/payment/subscription/${userId}`,
        undefined,
        await getAccessTokenSilently()
      )
  );

  const startCheckout = useAsync<CreateCheckoutSessionRequestBody, void>(
    async (body) => {
      const responseBody = await fetchJson<
        CreateCheckoutSessionRequestBody,
        CreateCheckoutSessionResponseBody
      >(
        "POST",
        `${baseUrl}/payment/checkout/${user?.sub}`,
        body,
        await getAccessTokenSilently()
      );
      const stripe = await loadStripe(
        stripeContext.publishableKey,
        stripeContext.options
      );
      stripe?.redirectToCheckout({
        sessionId: responseBody.sessionId,
      });
    }
  );

  const startPortal = useAsync<CreatePortalSessionRequestBody, void>(
    async (body) => {
      const responseBody = await fetchJson<
        CreatePortalSessionRequestBody,
        CreatePortalSessionResponseBody
      >(
        "POST",
        `${baseUrl}/payment/portal/${user?.sub}`,
        body,
        await getAccessTokenSilently()
      );
      router.push(responseBody.sessionUrl);
    }
  );

  // Automatically fetch
  useEffect(() => {
    getProducts.execute();
    getSubscription.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products: getProducts.result ? getProducts.result.products : [],
    subscription: getSubscription.result?.subscription,
    startCheckout: startCheckout.execute,
    startPortal: startPortal.execute,
    isLoading:
      getProducts.isLoading ||
      getSubscription.isLoading ||
      startCheckout.isLoading ||
      startPortal.isLoading,
    error:
      getProducts.error ||
      getSubscription.error ||
      startCheckout.error ||
      startPortal.error,
  };
};
