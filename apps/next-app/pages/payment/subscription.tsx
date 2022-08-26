import { withAuthenticationRequired } from "@auth0/auth0-react";
import { formatSubscriptionPrice } from "@my-org/react-api-client/payment/format-subscription-price";
import { useSubscription } from "@my-org/react-api-client/payment/use-subscription";
import { useAuth } from "@my-org/react-api-client/users/use-auth";
import { useInputState } from "@my-org/react-api-client/util/use-input-state";
import Head from "next/head";
import { FormEventHandler, useCallback } from "react";
import Layout from "../../components/layout";
import Row from "../../components/row";
import Section from "../../components/section";

const PlanPage = () => {
  const { user } = useAuth();

  const {
    subscription,
    products,
    startCheckout,
    startPortal,
    isLoading,
    error,
  } = useSubscription(user.sub);

  const [selectedPriceId, handlePriceSelection] = useInputState<string>("");

  const handleStartCheckout: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      startCheckout({
        priceId: selectedPriceId,
        returnUrl: window.location.href,
      });
    },
    [startCheckout, selectedPriceId]
  );

  const handleStartPortal: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      startPortal({
        returnUrl: window.location.href,
      });
    },
    [startPortal]
  );

  return (
    <Layout>
      <Head>
        <title>Subscription</title>
      </Head>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.toString()}</div>}
      {!isLoading && subscription && (
        <Section>
          <h2>Your Current Subscription</h2>
          <form onSubmit={handleStartPortal}>
            <ul>
              {subscription.items.data.map((item) => (
                <li key={item.id}>
                  <p>{formatSubscriptionPrice(item.price)}</p>
                </li>
              ))}
            </ul>
            <Row>
              <button type="submit" disabled={false}>
                Adjust
              </button>
            </Row>
          </form>
        </Section>
      )}
      {!isLoading && products && !subscription && (
        <Section>
          <h2>Available Plans</h2>
          <form onSubmit={handleStartCheckout}>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name}
                  <ul>
                    {product.prices.map((price) => (
                      <li key={price.id}>
                        <input
                          type="radio"
                          id={price.id}
                          name="price"
                          value={price.id}
                          onChange={handlePriceSelection}
                        />
                        <label htmlFor={price.id}>
                          {formatSubscriptionPrice(price)}
                        </label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Row>
              <button type="submit" disabled={false}>
                Subscribe
              </button>
            </Row>
          </form>
        </Section>
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(PlanPage);
