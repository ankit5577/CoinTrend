import { CardHeader, CardTitle } from "@/components/ui/card";
import { CoinData } from "@/types";
import { formatPrice } from "@/utils";

export function Header({ coin }: { coin: CoinData }) {
  const { current_price, price_change_24h, price_change_percentage_24h } = coin;
  const isPositive = price_change_percentage_24h > 0;

  return (
    <CardHeader className="pb-0 animate-fade-in-up">
      <CardTitle className="text-5xl font-medium text-[#1E293B]">
        {formatPrice(current_price?.toString())}
        <sup className="text-lg font-normal ml-2 text-gray-400 -top-4">USD</sup>
      </CardTitle>
      <p
        className={`text-sm font-medium ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : "-"} {Math.abs(price_change_24h).toFixed(2)} (
        {Math.abs(price_change_percentage_24h).toFixed(2)}%)
      </p>
    </CardHeader>
  );
}
