import { GetUserPermissionsResponseBody } from "@my-org/express-api/users/middleware";
import { useContext, useEffect } from "react";
import { context } from "../context";
import { fetchJson } from "../util/fetch-json";
import { useAsync } from "../util/use-async";
import { useAuth } from "./use-auth";

export const useUserPermissions = (id: string) => {
  const { baseUrl } = useContext(context);
  const { getAccessTokenSilently } = useAuth();

  const get = useAsync<void, GetUserPermissionsResponseBody>(async () =>
    fetchJson(
      "GET",
      `${baseUrl}/users/${id}/permissions`,
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

  return {
    permissions: get.result?.permissions,
    isLoading: get.isLoading,
    error: get.error,
  };
};
