import { endpoints } from "@/utils";

const apiCache = new Map();

export const makeApiCall = async (
  endpointKey: string,
  params: Record<string, any> = {},
  forceRefresh = false,
  id?: string
) => {
  let endpointUrl = endpoints.get(endpointKey);
  if (!endpointUrl) {
    throw new Error(`😤 Endpoint not found for key: ${endpointKey}`);
  }

  if (id) {
    endpointUrl = endpointUrl.replace("{id}", id);
  }

  let queryParamsString = "";
  if (params && Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params).toString();
    endpointUrl += `?${queryParams}`;
    queryParamsString = `?${queryParams}`;
  }

  // make key
  const cacheKey = `${endpointUrl}${queryParamsString}`;

  // check response
  const cachedResponse = apiCache.get(cacheKey);

  if (cachedResponse && !forceRefresh) {
    console.log(`👀 Returning cached response for: ${cacheKey}`);
    return cachedResponse;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-api-key": import.meta.env.VITE_APP_API_KEY || "",
    },
  };

  try {
    const response = await fetch(endpointUrl, options);

    if (!response.ok) {
      throw new Error(`😤 Failed to fetch data from ${endpointUrl}`);
    }

    const data = await response.json();

    apiCache.set(cacheKey, data);
    console.log(`⌛️ Caching response for: ${cacheKey}`);

    return data;
  } catch (error) {
    console.error(`🥲 Error fetching data from ${cacheKey}:`, error);
    throw error;
  }
};
