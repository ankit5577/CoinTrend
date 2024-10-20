import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const createApiEndpoint = (endpoint: string): string => {
  return `${import.meta.env.VITE_APP_API_URL}/${endpoint}`;
};

const endpoints = new Map([
  ["Coins", createApiEndpoint("coins/markets")],
  ["Coin", createApiEndpoint("coins")],
  ["CoinHistoricData", createApiEndpoint("coins/{id}/market_chart")],
]);

function formatPrice(priceString: string) {
  const price = parseFloat(priceString);

  return price.toLocaleString("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  });
}

function getDaysFromTimeRange(timeRange: string) {
  switch (timeRange) {
    case "1d":
      return 1;
    case "3d":
      return 3;
    case "1w":
      return 7;
    case "1m":
      return 30;
    case "6m":
      return 180;
    case "1y":
      return 365;
    default:
      return 365;
  }
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, endpoints, formatPrice, getDaysFromTimeRange };
