import { PriceEntry } from "./types";

export const timeRanges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

// DUMMY DATA FOR DEVELOPMENT USE
export const coinDummyData = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image:
    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  current_price: 68388,
  market_cap: 1351992976803,
  market_cap_rank: 1,
  fully_diluted_valuation: 1436125154813,
  total_volume: 29364236381,
  high_24h: 68970,
  low_24h: 67633,
  price_change_24h: 494.36,
  price_change_percentage_24h: 0.72813,
  market_cap_change_24h: 10008901682,
  market_cap_change_percentage_24h: 0.74583,
  circulating_supply: 19769762,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 73738,
  ath_change_percentage: -7.21797,
  ath_date: "2024-03-14T07:10:36.635Z",
  atl: 67.81,
  atl_change_percentage: 100794.49952,
  atl_date: "2013-07-06T00:00:00.000Z",
  roi: null,
  last_updated: "2024-10-19T09:29:11.404Z",
};

function generateDummyData(
  startTimestamp: number,
  numPoints: number,
  interval: number,
  startPrice: number
): PriceEntry[] {
  const data: PriceEntry[] = [];
  let price = startPrice;

  for (let i = 0; i < numPoints; i++) {
    const timestamp = startTimestamp - i * interval;
    // create random
    const fluctuation = price * 0.01 * (Math.random() - 0.5);
    price = parseFloat((price + fluctuation).toFixed(2));
    data.unshift([timestamp, price]);
  }

  return data;
}

const now = Date.now();

const timeRangeConfigs: {
  [key: string]: { numPoints: number; interval: number; startPrice: number };
} = {
  _1d: { numPoints: 24, interval: 60 * 60 * 1000, startPrice: 67741.5 },
  _3d: { numPoints: 72, interval: 60 * 60 * 1000, startPrice: 67741.5 },
  _1w: { numPoints: 7, interval: 24 * 60 * 60 * 1000, startPrice: 67741.5 },
  _1m: { numPoints: 30, interval: 24 * 60 * 60 * 1000, startPrice: 67741.5 },
  _6m: { numPoints: 180, interval: 24 * 60 * 60 * 1000, startPrice: 67741.5 },
  _1y: { numPoints: 365, interval: 24 * 60 * 60 * 1000, startPrice: 27741.5 },
  _max: {
    numPoints: 1365,
    interval: 24 * 60 * 60 * 20 * 1000,
    startPrice: 67741.5,
  },
};

export const chartDummyData: { [key: string]: PriceEntry[] } = {
  _1d: [],
  _3d: [],
  _1w: [],
  _1m: [],
  _6m: [],
  _1y: [],
  _max: [],
};

for (const range in timeRangeConfigs) {
  const config = timeRangeConfigs[range];
  chartDummyData[range] = generateDummyData(
    now,
    config.numPoints,
    config.interval,
    config.startPrice
  );
}
