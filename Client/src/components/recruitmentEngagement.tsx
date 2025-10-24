"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { jobOptions } from "@/assets/data";
import { timeOptions } from "@/assets/data";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const RecruitmentEngagement = () => {
  const [selectedJob, setSelectedJob] = useState("job-openings");
  const [selectedTime, setSelectedTime] = useState("monthly");
  const chartData = [
    { month: "Jan", desktop: 45 },
    { month: "Feb", desktop: 75 },
    { month: "Mar", desktop: 35 },
    { month: "Apr", desktop: 85 },
    { month: "May", desktop: 55 },
    { month: "Jun", desktop: 65 },
    { month: "Jul", desktop: 40 },
    { month: "Aug", desktop: 90 },
    { month: "Sep", desktop: 60 },
    { month: "Oct", desktop: 70 },
    { month: "Nov", desktop: 50 },
    { month: "Dec", desktop: 80 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#8B5CF6",
    },
  } satisfies ChartConfig;

  return (
    <div className=" px-4 sm:px-5 w-full lg:w-[60%]">
      <div className="py-6 lg:py-10 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 lg:py-5 gap-4 sm:gap-0">
          <h1 className="font-medium text-xl sm:text-[25px] leading-[26px]">
            Recruitment & Employee Engagement
          </h1>
          <button className="w-full sm:w-[180px] bg-indigo-950 text-white border-none rounded-full px-4 py-2 text-sm sm:text-base">
            View Details
          </button>
        </div>

        <div className="border rounded-xl shadow-xl p-4 sm:p-5 gap-4">
          <div className="flex flex-col sm:flex-row justify-between py-4 lg:py-5 gap-4 sm:gap-2">
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-[180px] bg-indigo-950 text-white border-none rounded-full px-4 py-2 text-sm sm:text-base">
                <SelectValue placeholder="Job Openings" />
              </SelectTrigger>
              <SelectContent>
                {jobOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white text-black border rounded-full px-4 py-2 text-sm sm:text-base">
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Card>
              <CardContent className="p-2 sm:p-6">
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 8,
                      right: 8,
                      top: 8,
                      bottom: 8,
                    }}
                    height={300}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      fontSize={12}
                    />
                    <YAxis
                      domain={[10, 100]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}%`}
                      fontSize={12}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          hideLabel
                          formatter={(value) => [`${value}%`, ""]}
                        />
                      }
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="#8B5CF6" // Purple color
                      fillOpacity={0.2} // Light opacity for light purple background
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: "#8B5CF6", strokeWidth: 1, r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                      connectNulls={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentEngagement;
