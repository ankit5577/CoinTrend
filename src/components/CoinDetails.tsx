import { Card, CardContent } from "@/components/ui/card";
import { CoinData } from "@/types";
import AnalysisTab from "./AnalysisTab";
import ChartComponent from "./Chart";
import { Header } from "./Header";
import StatisticsTab from "./StatisticTab";
import SummaryTab from "./SummaryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function CoinDetails({ coin }: { coin: CoinData }) {
  const tabData = [
    {
      value: "summary",
      label: "Summary",
      content: <SummaryTab coin={coin} />,
      className: "rounded-tl-lg",
    },
    {
      value: "chart",
      label: "Chart",
      content: <ChartComponent coin={coin} />,
      className: "rounded-tr-lg",
    },
    {
      value: "statistics",
      label: "Statistics",
      content: <StatisticsTab coin={coin} />,
      className: "rounded-tr-lg",
    },
    {
      value: "analysis",
      label: "Analysis",
      content: <AnalysisTab coin={coin} />,
      className: "rounded-tr-lg",
    },
    {
      value: "settings",
      label: "Settings",
      content: "Coming soon...",
      className: "rounded-tr-lg",
    },
  ];

  const triggerClasses = `h-12 border-b-2 text-base text-gray-400
    data-[state=active]:border-b-2 data-[state=active]:border-b-primary
    data-[state=active]:bg-white data-[state=active]:text-gray-700`;
  return (
    <Card
      className={`bg-white neumorphic w-full !rounded-2xl !shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(255,0,0,1)_0px_30px_60px_-30px]`}
    >
      <Header coin={coin} />
      <CardContent>
        <div className="flex w-full mb-4 text-sm text-gray-500">
          <Tabs defaultValue="chart" className="w-full max-w-3xl">
            <TabsList className="grid h-12 w-full grid-cols-6 rounded-none p-0 animate-fade-in-up">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={`${triggerClasses} ${tab.className}`}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex my-5 w-full min-h-[23rem] animate-fade-in-up">
              {tabData.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="w-full animate-fade-in-down"
                >
                  {tab.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
