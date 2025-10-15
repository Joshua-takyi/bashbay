"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface RevenueChartProps {
  data?: Array<{ month: string; value: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Default data if none provided
  const defaultData = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 18000 },
    { month: "Mar", value: 21000 },
    { month: "Apr", value: 19000 },
    { month: "May", value: 24000 },
    { month: "Jun", value: 26000 },
    { month: "Jul", value: 28000 },
    { month: "Aug", value: 30000 },
    { month: "Sep", value: 29000 },
    { month: "Oct", value: 32000 },
  ];

  const chartData = data || defaultData;
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Your earnings over the past 10 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
            <span>${(maxValue / 1000).toFixed(0)}k</span>
            <span>${((maxValue * 0.75) / 1000).toFixed(0)}k</span>
            <span>${((maxValue * 0.5) / 1000).toFixed(0)}k</span>
            <span>${((maxValue * 0.25) / 1000).toFixed(0)}k</span>
            <span>$0k</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full flex items-end justify-between gap-2">
            {chartData.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              const isLast3 = index >= chartData.length - 3;

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  {/* Bar */}
                  <div className="w-full relative flex items-end justify-center h-[260px]">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${
                        isLast3 ? "bg-primary" : "bg-primary/20"
                      }`}
                      style={{ height: `${height}%` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${(item.value / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>

                  {/* Month label */}
                  <span className="text-xs text-muted-foreground">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
