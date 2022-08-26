import { Context } from "../context";
import { Item } from "./model";

export interface ItemData {
  value: string;
}

export const createItem = async (
  context: Context,
  itemData: ItemData
): Promise<Item> => {
  const item: Item = {
    id: Date.now().toString(),
    ...itemData,
  };
  context.itemStorage.push(item);
  return item;
};
