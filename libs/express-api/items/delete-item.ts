import { Context } from "../context";

export const deleteItem = async (
  context: Context,
  id: string
): Promise<string> => {
  const index = context.itemStorage.findIndex((item) => item.id === id);
  if (index !== -1) {
    context.itemStorage.splice(index, 1);
    return id;
  } else {
    throw new Error(`Cannot find ${id}.`);
  }
};
