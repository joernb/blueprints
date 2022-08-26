import { Context } from "../context";
import { Item } from "./model";

export const getItem = async (context: Context, id: string): Promise<Item> => {
  const item = context.itemStorage.find((item) => item.id === id);
  if (item) {
    return item;
  } else {
    throw new Error(`Cannot find ${id}.`);
  }
};
