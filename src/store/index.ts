import { timeRanges } from "@/constants";
import { CoinData, PriceEntry } from "@/types";
import { create } from "zustand";

interface StoreState {
  coinsList: CoinData[];
  timeRange: string;
  coinPrices: PriceEntry[] | null;
  setCoinsList: (newCoinsList: CoinData[]) => void;
  setCoinPrices: (prices: PriceEntry[]) => void;
  clearCoinPrices: () => void;
  setTimeRange: (timeRange: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  coinsList: [],
  timeRange: timeRanges[1],
  coinPrices: [],
  setCoinsList: (newCoinsList: CoinData[]) => set({ coinsList: newCoinsList }),
  setTimeRange: (timeRange: string) => set({ timeRange }),
  setCoinPrices: (prices: PriceEntry[]) => set({ coinPrices: prices }),
  clearCoinPrices: () => set({ coinPrices: null }),
}));
