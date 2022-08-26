import { Router } from "express";
import { Context } from "./context";
import { middleware as itemsMiddleware } from "./items/middleware";
import { itemStorage } from "./items/model";
import { handleErrors } from "./util/handle-errors";

export interface Options {}

/**
 * Creates an Express API middleware that implements the API
 */
export const middleware = (options: Options) => {
  const context: Context = {
    itemStorage: itemStorage(),
  };

  const routes = Router();

  routes.use("/items", itemsMiddleware(context));

  routes.use(handleErrors);

  return routes;
};
