import { ManagementClient } from "auth0";
import { Item } from "./items/model";

export interface Context {
  itemStorage: Item[];
  auth0ManagementClient: ManagementClient;
}
