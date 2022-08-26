/**
 * Use the Fetch API with JSON payload and error handling.
 */
export const fetchJson = async <RequestBody, ResponseBody>(
  method: string,
  url: string,
  requestBody: RequestBody,
  accessToken?: string
): Promise<ResponseBody> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
    },
    body: JSON.stringify(requestBody),
  });
  const responseBody = await response.json();
  // Throw error for bad response codes (4xx, 5xx)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return responseBody;
};
