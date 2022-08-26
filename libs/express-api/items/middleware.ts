import { Router } from "express";
import { Context } from "../context";
import { checkPermission } from "../util/check-permission";
import { createItem } from "./create-item";
import { deleteItem } from "./delete-item";
import { getItem } from "./get-item";
import { getItems } from "./get-items";
import { Item, permissions } from "./model";
import { updateItem } from "./update-item";

export interface GetItemsResponseBody {
  items: Item[];
}

export interface CreateItemRequestBody {
  value: string;
}

export interface CreateItemResponseBody {
  item: Item;
}

export interface GetItemRequestParams {
  id: string;
}

export interface GetItemResponseBody {
  item: Item;
}

export interface DeleteItemRequestParams {
  id: string;
}

export interface DeleteItemResponseBody {
  id: string;
}

export interface UpdateItemRequestParams {
  id: string;
}

export interface UpdateItemRequestBody {
  value: string;
}

export interface UpdateItemResponseBody {
  item: Item;
}

export const middleware = (context: Context) => {
  const routes = Router();

  routes.get<void, GetItemsResponseBody>(
    "/",
    checkPermission(permissions.READ_ITEMS),
    async (req, res) =>
      res.json({
        items: await getItems(context),
      })
  );

  routes.get<GetItemRequestParams, GetItemResponseBody>(
    "/:id",
    checkPermission(permissions.READ_ITEMS),
    async (req, res) =>
      res.json({
        item: await getItem(context, req.params.id),
      })
  );

  routes.post<void, CreateItemResponseBody, CreateItemRequestBody>(
    "/",
    checkPermission(permissions.WRITE_ITEMS),
    async (req, res) =>
      res.json({
        item: await createItem(context, req.body),
      })
  );

  routes.put<
    UpdateItemRequestParams,
    UpdateItemResponseBody,
    UpdateItemRequestBody
  >("/:id", checkPermission(permissions.WRITE_ITEMS), async (req, res) =>
    res.json({
      item: await updateItem(context, req.params.id, req.body),
    })
  );

  routes.delete<DeleteItemRequestParams, DeleteItemResponseBody>(
    "/:id",
    checkPermission(permissions.WRITE_ITEMS),
    async (req, res) =>
      res.json({
        id: await deleteItem(context, req.params.id),
      })
  );

  return routes;
};
