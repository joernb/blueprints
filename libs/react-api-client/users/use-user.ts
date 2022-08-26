import {
  DeleteUserResponseBody,
  GetUserResponseBody,
  UpdateUserRequestBody,
  UpdateUserResponseBody,
} from "@my-org/express-api/users/middleware";
import { User } from "@my-org/express-api/users/model";
import { useContext, useEffect } from "react";
import { context } from "../context";
import { fetchJson } from "../util/fetch-json";
import { useAsync } from "../util/use-async";
import { useAuth } from "./use-auth";

export const useUser = (id: string) => {
  const { baseUrl } = useContext(context);
  const { getAccessTokenSilently } = useAuth();

  const get = useAsync<void, GetUserResponseBody>(async () =>
    fetchJson(
      "GET",
      `${baseUrl}/users/${id}`,
      undefined,
      await getAccessTokenSilently()
    )
  );
  const update = useAsync<UpdateUserRequestBody, UpdateUserResponseBody>(
    async (body) =>
      fetchJson(
        "PUT",
        `${baseUrl}/users/${id}`,
        body,
        await getAccessTokenSilently()
      )
  );
  const del = useAsync<void, DeleteUserResponseBody>(async () =>
    fetchJson(
      "DELETE",
      `${baseUrl}/users/${id}`,
      undefined,
      await getAccessTokenSilently()
    )
  );

  // Automatically fetch item
  useEffect(() => {
    if (id) {
      get.execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let user: User | undefined;

  // Infer item state based on wether item has been deleted or updated
  if (del.result) {
    user = undefined;
  } else if (update.result) {
    user = update.result.user;
  } else if (get.result) {
    user = get.result.user;
  }

  return {
    user,
    updateUser: update.execute,
    deleteUser: del.execute,
    isLoading: get.isLoading || update.isLoading || del.isLoading,
    error: get.error || update.error || del.error,
  };
};
