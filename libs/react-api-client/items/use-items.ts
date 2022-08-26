import {
  CreateItemRequestBody,
  CreateItemResponseBody,
  GetItemsResponseBody,
} from "@my-org/express-api/items/middleware";
import { useContext, useEffect } from "react";
import { context } from "../context";
import { fetchJson } from "../util/fetch-json";
import { useAsync } from "../util/use-async";

export const useItems = () => {
  const { baseUrl } = useContext(context);

  // const get = useApi<void, GetItemsResponseBody>("GET", `${baseUrl}/items`);
  const get = useAsync<void, GetItemsResponseBody>(() =>
    fetchJson("GET", `${baseUrl}/items`, undefined)
  );

  const create = useAsync<CreateItemRequestBody, CreateItemResponseBody>(
    (body) => fetchJson("POST", `${baseUrl}/items`, body)
  );

  // Automatically fetch items
  useEffect(() => {
    get.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create.result]);

  return {
    items: get.result ? get.result.items : [],
    createItem: create.execute,
    isLoading: get.isLoading || create.isLoading,
    error: get.error || create.error,
  };
};
