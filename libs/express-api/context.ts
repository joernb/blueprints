import { ManagementClient } from "auth0";
import { Item } from "./items/model";
import { AppMetadata, UserMetadata } from "./users/model";
import Stripe from "stripe";

export interface Context {
  itemStorage: Item[];
  auth0ManagementClient: ManagementClient<AppMetadata, UserMetadata>;
  stripeClient: Stripe;
}
