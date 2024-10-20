import { getCoinHistoricData } from "@/api/endpoints";
import { chartDummyData, timeRanges } from "@/constants";
import { useStore } from "@/store";
import { CoinData } from "@/types";
import { getDaysFromTimeRange } from "@/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import ChartViewComponent from "./Chart";
import { Button } from "./ui/button";

interface IProps {
  coin: CoinData;
}

export default function ({ coin }: IProps) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [limitExceeded, setLimitExceeded] = useState<boolean>(false);

  const {
    setCoinPrices,
    clearCoinPrices,
    timeRange,
    coinPrices,
    setTimeRange,
  } = useStore((state) => state);

  console.log(
    "@CHART::useStore",
    setCoinPrices,
    clearCoinPrices,
    timeRange,
    coinPrices,
    setTimeRange
  );

  function useDummyData() {
    console.log("using dummy data for", timeRange);
    setCoinPrices(chartDummyData[`_${timeRange}`]);
    setLimitExceeded(false);
  }

  useLayoutEffect(() => {
    const fetchData = async () => {
      const coinId = coin?.id?.toLowerCase();
      try {
        const days = getDaysFromTimeRange(timeRange);
        if (coinId) {
          clearCoinPrices();
          const historicData = await getCoinHistoricData(coinId, days);
          const { prices } = historicData;
          setCoinPrices(prices);
        }
      } catch (e) {
        console.error("COINGECKO:LIMIT", e);
        setLimitExceeded(true);
      }
    };

    if (import.meta.env.MODE === "development" && false) {
      // setCoinPrices(chartDummyData);
    } else {
      fetchData();
    }
  }, [timeRange, coin?.id, clearCoinPrices, setCoinPrices]);

  useEffect(() => {
    if (coinPrices?.length > 0) {
      setLoading(false);
    }
  }, [coinPrices]);

  function toggleFullscreen() {
    const chartElement = document.getElementById("currency-card");

    if (!document.fullscreenElement) {
      if (chartElement?.requestFullscreen) {
        chartElement.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          );
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement === document.getElementById("currency-card")
      ) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-gray-700 p-0"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
            </svg>
            Fullscreen
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-gray-700 p-0"
            aria-label="Compare"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Compare
          </Button>
        </div>
        <div className="flex gap-2">
          {timeRanges?.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-0 text-xs rounded-[0.5rem] ${
                timeRange === range
                  ? "bg-primary text-white"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={`${
          isFullscreen
            ? "fixed top-0 left-0 w-full h-full bg-white z-50"
            : "h-[300px]"
        } w-full transition-all duration-300`}
      >
        <ChartViewComponent
          data={coinPrices}
          loading={limitExceeded || loading}
          limitExceeded={limitExceeded}
          useDummyDataHandler={useDummyData}
        />
      </div>
    </div>
  );
}
