import {
  DeleteItemResponseBody,
  GetItemResponseBody,
  UpdateItemRequestBody,
  UpdateItemResponseBody,
} from "@my-org/express-api/items/middleware";
import type { Item } from "@my-org/express-api/items/model";
import { useContext, useEffect } from "react";
import { context } from "../context";
import { useAuth } from "../users/use-auth";
import { fetchJson } from "../util/fetch-json";
import { useAsync } from "../util/use-async";

export const useItem = (id: string) => {
  const { baseUrl } = useContext(context);
  const { getAccessTokenSilently } = useAuth();

  const get = useAsync<void, GetItemResponseBody>(async () =>
    fetchJson(
      "GET",
      `${baseUrl}/items/${id}`,
      undefined,
      await getAccessTokenSilently()
    )
  );
  const update = useAsync<UpdateItemRequestBody, UpdateItemResponseBody>(
    async (body) =>
      fetchJson(
        "PUT",
        `${baseUrl}/items/${id}`,
        body,
        await getAccessTokenSilently()
      )
  );
  const del = useAsync<void, DeleteItemResponseBody>(async () =>
    fetchJson(
      "DELETE",
      `${baseUrl}/items/${id}`,
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

  let item: Item | undefined;

  // Infer item state based on wether item has been deleted or updated
  if (del.result) {
    item = undefined;
  } else if (update.result) {
    item = update.result.item;
  } else if (get.result) {
    item = get.result.item;
  }

  return {
    item,
    updateItem: update.execute,
    deleteItem: del.execute,
    isLoading: get.isLoading || update.isLoading || del.isLoading,
    error: get.error || update.error || del.error,
  };
};
