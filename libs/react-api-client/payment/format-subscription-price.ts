import { Price } from "@my-org/express-api/payment/model";

/**
 * Formats a subscription price. Something like "$42.00 / Month".
 */
export const formatSubscriptionPrice = (price: Price) => {
  // e.g. $42.00
  let priceString;
  // e.g. 3 Months
  let intervalString;

  if (price.unit_amount) {
    priceString = Math.round(price.unit_amount / 100).toLocaleString("en", {
      style: "currency",
      currency: price.currency,
    });
  }

  if (price.recurring) {
    intervalString =
      price.recurring.interval_count > 1
        ? `${price.recurring.interval}s`
        : `${price.recurring.interval}`;
  }

  // e.g. $42.00 / 3 Months
  return `${priceString} / ${intervalString}`;
};
