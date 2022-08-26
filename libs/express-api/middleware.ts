import { Router } from "express";
import { Context } from "./context";
import { middleware as itemsMiddleware } from "./items/middleware";
import { itemStorage } from "./items/model";
import { middleware as usersMiddleware } from "./users/middleware";
import {
  managementClient,
  Options as Auth0ManagementClientOptions,
} from "./util/auth0-management-client";
import { handleForbiddenErrors } from "./util/check-permission";
import { handleErrors } from "./util/handle-errors";
import {
  handleUnauthorizedErrors,
  Options as JwtMiddlewareOptions,
  verifyJwt,
} from "./util/verify-jwt";

export interface Options {
  auth0ManagementClient: Auth0ManagementClientOptions;
  jwt: JwtMiddlewareOptions;
}

/**
 * Creates an Express API middleware that implements the API
 */
export const middleware = (options: Options) => {
  const context: Context = {
    itemStorage: itemStorage(),
    auth0ManagementClient: managementClient(options.auth0ManagementClient),
  };

  const routes = Router();

  // Authorization middleware, that verifies access tokens against a JSON Web Key Set
  const verifyJwtMiddleware = verifyJwt(options.jwt);

  routes.use("/items", verifyJwtMiddleware, itemsMiddleware(context));
  routes.use("/users", verifyJwtMiddleware, usersMiddleware(context));

  routes.use(handleUnauthorizedErrors);
  routes.use(handleForbiddenErrors);
  routes.use(handleErrors);

  return routes;
};
