import { Area, AreaChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

type EmployeeCardProps = {
  heading: string;
  icon: React.ComponentType<any>; // Icon component type
  improvePercent: number;
  total: number;
  chartData: { desktop: number }[];
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  heading,
  icon: Icon,
  improvePercent,
  total,
  chartData,
}) => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div className="border shadow-md hover:shadow-xl p-3  rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 p-1 rounded-full">
          <Icon />
        </div>
        <div>
          <h1 className="font-medium">{heading}</h1>
          <p className="text-sm">Improved from last month</p>
        </div>
        <div
          className={`rounded-full px-2 ${
            improvePercent >= 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {improvePercent}%
        </div>
      </div>

      <div className="flex items-center">
        <div className="text-3xl">{total}</div>
        <Card className="w-[500px] h-[130px] border-none relative overflow-hidden bg-transparent shadow-none">
          <CardContent className="p-2 h-full bg-transparent">
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={chartData}
                margin={{ left: 12, right: 12, top: 0, bottom: 0 }}
                className="w-full h-full"
              >
                <Area
                  dataKey="desktop"
                  type="linear"
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="rgb(4,150,105)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeCard;
