import { PriceEntry } from "@/types";
import {
  AreaData,
  ColorType,
  createChart,
  ISeriesApi,
} from "lightweight-charts";
import { LegacyRef, useEffect, useRef } from "react";
import { ChartSkeleton } from "./ChartSkeleton";

interface ChartProps {
  data: PriceEntry[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
  loading: boolean;
  limitExceeded: boolean;
  useDummyDataHandler: () => void;
}

export default function ChartComponent(props: ChartProps) {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#6366F1",
      textColor = "#64748B",
      areaTopColor = "rgba(99, 102, 241, 0.2)",
      areaBottomColor = "rgba(99, 102, 241, 0.02)",
    } = {},
    loading,
    limitExceeded,
    useDummyDataHandler,
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  console.log("@price", data, loading);

  useEffect(() => {
    if (loading || !data || !chartContainerRef.current) {
      return;
    }

    if (!chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          attributionLogo: false,
          textColor,
          fontFamily: "Inter, -apple-system, system-ui, sans-serif",
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        rightPriceScale: {
          visible: true,
          borderVisible: true,
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
          },
          autoScale: true,
          borderColor: "rgba(197, 203, 206, 0.3)",
          textColor: "white",
        },
        leftPriceScale: {
          visible: false,
        },
        grid: {
          vertLines: {
            visible: true,
            color: "rgba(197, 203, 206, 0.5)",
            style: 1,
          },
          horzLines: {
            visible: false,
            color: "rgba(197, 203, 206, 0.0)",
            style: 1,
          },
        },
        crosshair: {
          vertLine: {
            visible: true,
            labelVisible: false,
          },
          horzLine: {
            visible: true,
            labelVisible: true,
          },
        },
        timeScale: {
          borderVisible: false,
          visible: true,
          timeVisible: true,
          secondsVisible: false,
          fixLeftEdge: true,
          fixRightEdge: true,
        },
        handleScale: {
          axisPressedMouseMove: {
            time: false,
            price: false,
          },
        },
      });

      chartRef.current.timeScale().fitContent();

      seriesRef.current = chartRef.current.addAreaSeries({
        lineColor,
        lineWidth: 2,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
        priceFormat: {
          type: "price",
          precision: 2,
          minMove: 0.01,
        },
        lastValueVisible: true,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: lineColor,
        crosshairMarkerBackgroundColor: "white",
      });
    }

    const formattedData = data?.map(([timestamp, value]: [number, number]) => ({
      time: Math.floor(timestamp / 1000),
      value: value,
    }));

    const sortedData = [...formattedData].sort((a, b) => a.time - b.time);

    if (sortedData.length === 0) {
      console.error("No data available to render the chart.");
      return;
    }

    seriesRef.current?.setData(sortedData as AreaData[]);

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
        chartRef.current.timeScale().fitContent();
      }
    };

    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      handleResize();
    }, 1);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    document?.fullscreenElement,
    textColor,
    areaTopColor,
    areaBottomColor,
    loading,
  ]);

  if (loading || !data || limitExceeded) {
    if (limitExceeded)
      return (
        <ChartSkeleton
          text="CoinGecko API Limit Exceeded"
          actionHandlerText="Use Dummy Data"
          actionHandler={useDummyDataHandler}
        />
      );
    return <ChartSkeleton />;
  }

  return (
    <div
      id="currency-card"
      ref={chartContainerRef as LegacyRef<HTMLDivElement>}
      style={{
        position: "relative",
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        padding: "16px",
        width: "100%",
        height: "100%",
        minHeight: "250px",
      }}
    />
  );
}
