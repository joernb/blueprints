[❮ Overview](../../README.md)

<div align="center">
  <h1>
    Stripe
  </h1>
</div>

Provides subscriptions and payment functionality.

# 🧬 Structure

## Cloud Resources

- Accounts `my-org-staging` / `my-org`: Isolated environments that are managed through the dashboard or the Stripe API. The production account needs to go through the [activation process](https://stripe.com/docs/account/activate) to verify that it belongs to a real business.
  - [Products](https://stripe.com/docs/products-prices/how-products-and-prices-work): Products are digital items or subscription plans (e.g. "Premium Plan")
    - Metadata: Customizable metadata of a product.
      - `role`: The [Auth0](../auth0/README.md) role name (e.g. `Premium`) that is supposed to be assigned to subscribers of this subscription product to give them additional permissions (e.g. access premium features).
    - Price: A specific price for the product (e.g. 10 EUR/Month)
  - [Customers](https://stripe.com/docs/billing/customer): A customer object is typically linked to an Auth0 user account. It stores payment information about the buyer. Customer objects are created when a user enters the checkout process for the first time. The customer is reused in subsequent checkouts or when starting a customer portal session to change/cancel subscriptions.
    - Metadata: Customizable metadata of a customer.
      - `userId`: [Auth0](../auth0/README.md) user id this customer is linked to.
  - [Tax Rates](https://stripe.com/docs/billing/taxes/tax-rates): Stores taxation details that should be applied during checkout.
    - VAT, Inclusive 19%, Germany
  - [Webhooks](https://stripe.com/docs/billing/subscriptions/webhooks): Webhooks are API endpoints that receive notifications of subscription activity. The events are digitally signed and are supposed to be verified by the receiver.
    - `$PUBLIC_URL/api/payment/event`: Register backend API endpoint as webhook.

## Interactions

- [Dashboard](https://dashboard.stripe.com): Administrative UI.
- [Stripe API](https://stripe.com/docs/api): REST API that is used by backend code.
- [Hosted Checkout](https://stripe.com/docs/api/checkout/sessions): Stripe Checkout is a Stripe-hosted web page that asks the user for payment data (e.g. credit card number, address, etc.) and confirmation to purchase a product or subscribe to a subscription. To start the checkout a checkout session needs to be created in the backend and given some context (e.g. product, price, customer, tax rates, ...). The checkout session id is then returned to the frontend which redirects the browser to the checkout page.
- [Customer Portal](https://stripe.com/docs/api/customer_portal): The Customer Portal is a Stripe-hosted web page that allows customers to change or cancel their subscriptions and access invoices. To start the portal a portal session needs to be created in the backend and given some context (customer, subscription, ...). The portal session url is then returned to the frontend which redirects the browser to the portal page.
- [Webhooks](https://stripe.com/docs/billing/subscriptions/webhooks): Webhooks are API endpoints that receive notifications of subscription activity. The events are digitally signed and are supposed to be verified by the receiver.

# 🛰️ Operations

## Monitoring

- [Dashboard](https://dashboard.stripe.com)
  - [Reports -> Billing](https://support.stripe.com/questions/billing-analytics-dashboard)
    - Growth
      - Monthly recurring revenue (MRR)
      - MRR Growth
      - Net revenue
      - New subscribers
    - Products
      - MRR by product
      - MRR by plan
    - Retention
      - Subscriber churn rate
      - Churned revenue
      - Subscriber retention by cohort
      - Revenue retention by cohort
    - Subscribers
      - Average revenue per subscriber (ARPS)
      - Lifetime value (LTV)
      - Top subscribers
      - Recently churned subscribers
    - Collections
      - Outstanding invoices
      - Recovered revenue
  - [Payments](https://stripe.com/docs/payments): Detailed logs of all payments.
  - [Customers](https://stripe.com/docs/invoicing/customer): Detailed log of a customer's activity.
