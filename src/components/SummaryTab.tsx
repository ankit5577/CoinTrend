import { CoinData } from "@/types";
import { formatPrice } from "@/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function SummaryTab({ coin }: { coin: CoinData }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid gap-4 grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Price</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${coin.current_price.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {coin.price_change_percentage_24h > 0 ? (
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">All-Time High</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${formatPrice(coin.ath.toString())}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(coin.ath_date)}
            <Badge
              variant={
                coin.ath_change_percentage < 0 ? "destructive" : "default"
              }
              className="ml-2"
            >
              {coin.ath_change_percentage.toFixed(2)}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
