import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinData } from "@/types";
import { formatPrice } from "@/utils";
import { ArrowUpDown, CircleDollarSign, Coins, TrendingUp } from "lucide-react";

export default function StatisticsTab({ coin }: { coin: CoinData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Circulating Supply
          </CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPrice(coin.circulating_supply.toString())}
          </div>
          <p className="text-xs text-muted-foreground">
            Total Supply:{" "}
            {coin?.total_supply && formatPrice(coin?.total_supply.toString())}
          </p>
          {coin.max_supply && (
            <p className="text-xs text-muted-foreground">
              Max Supply: {formatPrice(coin.max_supply.toString())}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Fully Diluted Valuation
          </CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            $
            {coin.fully_diluted_valuation &&
              formatPrice(coin.fully_diluted_valuation.toString())}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            24h Trading Volume
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${formatPrice(coin.total_volume.toString())}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Price Range</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Low</p>
              <p className="text-lg font-bold">
                ${formatPrice(coin.low_24h.toString())}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">High</p>
              <p className="text-lg font-bold">
                ${formatPrice(coin.high_24h.toString())}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
