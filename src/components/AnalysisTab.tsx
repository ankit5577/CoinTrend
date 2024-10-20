import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinData } from "@/types";
import { formatPrice } from "@/utils";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

export default function AnalysisTab({ coin }: { coin: CoinData }) {
  const renderTrend = (value: number) => {
    return value > 0 ? (
      <span className="text-green-600 flex items-center">
        <TrendingUp className="mr-1 h-4 w-4" />
        {value.toFixed(2)}%
      </span>
    ) : (
      <span className="text-red-600 flex items-center">
        <TrendingDown className="mr-1 h-4 w-4" />
        {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Price Change % (24h)
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderTrend(coin.price_change_percentage_24h)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Price Change $ (24h)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${formatPrice(coin.price_change_24h.toString())}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Market Cap Change % (24h)
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderTrend(coin.market_cap_change_percentage_24h)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Market Cap Change $ (24h)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${formatPrice(coin.market_cap_change_24h.toString())}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">All Time High %</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderTrend(coin.ath_change_percentage)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">All Time Low %</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          {renderTrend(coin.atl_change_percentage)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
