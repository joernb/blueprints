import { UserMetadata } from "auth0";
import { Router } from "express";
import { Context } from "../context";
import { checkIsUser } from "../util/check-is-user";
import { deleteUser } from "./delete-user";
import { getUser } from "./get-user";
import { getUserPermissions } from "./get-user-permissions";
import { Permission, User } from "./model";
import { updateUser } from "./update-user";

export interface DeleteUserRequestParams {
  id: string;
}

export interface DeleteUserResponseBody {
  id: string;
}

export interface GetUserRequestParams {
  id: string;
}

export interface GetUserResponseBody {
  user: User;
}

export interface UpdateUserRequestParams {
  id: string;
}

export interface UpdateUserRequestBody {
  email?: string;
  password?: string;
  userMetadata?: UserMetadata;
}

export interface UpdateUserResponseBody {
  user: User;
}

export interface GetUserPermissionsRequestParams {
  id: string;
}

export interface GetUserPermissionsResponseBody {
  permissions: Permission[];
}

export const middleware = (context: Context) => {
  const routes = Router();

  routes.get<GetUserRequestParams, GetUserResponseBody>(
    "/:id",
    checkIsUser("id"),
    async (req, res) =>
      res.json({
        user: await getUser(context, req.params.id),
      })
  );

  routes.get<GetUserPermissionsRequestParams, GetUserPermissionsResponseBody>(
    "/:id/permissions",
    checkIsUser("id"),
    async (req, res) =>
      res.json({
        permissions: await getUserPermissions(context, req.params.id),
      })
  );

  routes.put<
    UpdateUserRequestParams,
    UpdateUserResponseBody,
    UpdateUserRequestBody
  >("/:id", checkIsUser("id"), async (req, res) =>
    res.json({
      user: await updateUser(context, req.params.id, {
        email: req.body.email,
        password: req.body.password,
        user_metadata: req.body.userMetadata,
      }),
    })
  );

  routes.delete<DeleteUserRequestParams, DeleteUserResponseBody>(
    "/:id",
    checkIsUser("id"),
    async (req, res) =>
      res.json({
        id: await deleteUser(context, req.params.id),
      })
  );

  return routes;
};
