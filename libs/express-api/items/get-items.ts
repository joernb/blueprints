import { Context } from "../context";
import { Item } from "./model";

export const getItems = async (context: Context): Promise<Item[]> => {
  return context.itemStorage;
};
