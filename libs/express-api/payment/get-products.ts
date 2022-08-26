import Stripe from "stripe";
import { Context } from "../context";
import { UserId } from "../users/model";
import { Product } from "./model";

const getProductPrices = async (
  context: Context,
  product: Stripe.Product
): Promise<Stripe.Price[]> => {
  const { data: prices } = await context.stripeClient.prices.list({
    product: product.id,
    active: true,
    limit: 20,
  });
  return prices;
};

export const getProducts = async (
  context: Context,
  userId: UserId
): Promise<Product[]> => {
  // Get all products
  const { data: allProducts } = await context.stripeClient.products.list({
    active: true,
    limit: 100,
  });

  // Map stripe products to model products (which also include prices)
  const productsWithPrices: Product[] = await Promise.all(
    allProducts.map(async (product): Promise<Product> => {
      const prices = await getProductPrices(context, product);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        order: product.metadata.order ? parseInt(product.metadata.order) : 0,
        prices,
      };
    })
  );

  // Sort products
  const sortedProductsWithPrices = productsWithPrices.sort(
    (a, b) => a.order - b.order
  );

  return sortedProductsWithPrices;
};
