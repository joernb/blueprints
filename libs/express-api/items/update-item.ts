import { Context } from "../context";
import { Item } from "./model";

export interface ItemData {
  value: string;
}

export const updateItem = async (
  context: Context,
  id: string,
  itemData: ItemData
): Promise<Item> => {
  const index = context.itemStorage.findIndex((item) => item.id === id);
  if (index !== -1) {
    const item = {
      ...context.itemStorage[index],
      ...itemData,
    };
    context.itemStorage.splice(index, 1, item);
    return item;
  } else {
    throw new Error(`Cannot find ${id}.`);
  }
};
