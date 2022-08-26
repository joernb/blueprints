import { Router } from "express";
import { Context } from "../context";
import { createItem } from "./create-item";
import { deleteItem } from "./delete-item";
import { getItem } from "./get-item";
import { getItems } from "./get-items";
import { Item } from "./model";
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

  routes.get<void, GetItemsResponseBody>("/", async (req, res) =>
    res.json({
      items: await getItems(context),
    })
  );

  routes.post<void, CreateItemResponseBody, CreateItemRequestBody>(
    "/",
    async (req, res) =>
      res.json({
        item: await createItem(context, req.body),
      })
  );

  routes.get<GetItemRequestParams, GetItemResponseBody>(
    "/:id",
    async (req, res) =>
      res.json({
        item: await getItem(context, req.params.id),
      })
  );

  routes.put<
    UpdateItemRequestParams,
    UpdateItemResponseBody,
    UpdateItemRequestBody
  >("/:id", async (req, res) =>
    res.json({
      item: await updateItem(context, req.params.id, req.body),
    })
  );

  routes.delete<DeleteItemRequestParams, DeleteItemResponseBody>(
    "/:id",
    async (req, res) =>
      res.json({
        id: await deleteItem(context, req.params.id),
      })
  );

  return routes;
};
