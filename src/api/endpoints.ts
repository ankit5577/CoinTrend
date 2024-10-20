import { makeApiCall } from ".";

export const getCoinsList = async (forceRefresh = false) => {
  return makeApiCall(
    "Coins",
    { vs_currency: "usd", order: "market_cap_desc", per_page: 10 },
    forceRefresh
  );
};

export const getCoinHistoricData = async (
  id: string,
  days: number,
  forceRefresh = false
) => {
  return makeApiCall(
    "CoinHistoricData",
    { vs_currency: "usd", days: days },
    forceRefresh,
    id
  );
};
