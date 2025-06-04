import React from "react";
import { Label, Pie, PieChart as RechartsPieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./card.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart.tsx";
import { formatDate1 } from "../Utils/UtilFunctions.jsx";

const colors = ["#1CE6B9", "#540081", "#FE8A0E", "#0042FF"];
const colorinfinite = (p, i) => colors[i % colors.length];

export function PieChart({ DashboardData }) {
  const waitlist = DashboardData?.join_waitlist_submissions || [];

  // Aggregate waitlist data by company name
  const chartData = waitlist.reduce((acc, entry) => {
    const company = entry.name || entry.name || "Unknown";
    const existing = acc.find((item) => item.name === company);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: company, value: 1 });
    }
    return acc;
  }, []);

  const formattedData = chartData.map((d, i) => ({
    ...d,
    fill: colorinfinite(d, i),
  }));

  return (
    <Card className="bg-[var(--cards-bg)] border border-zinc-800 rounded-2xl">
      {formattedData.length > 0 ? (
        <>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              className="mx-auto aspect-square max-h-[250px]"
              config={{}}
            >
              <RechartsPieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={formattedData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {waitlist.length}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Signups
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="text-md">
            🎉 You've received {waitlist.length} waitlist{" "}
            {waitlist.length > 1 ? "submissions" : "submission"}. Great
            progress!
          </CardFooter>
        </>
      ) : (
        <div className="flex justify-center p-6">
          <p className="text-sm text-muted-foreground">
            No waitlist submissions found during this period.
          </p>
        </div>
      )}
    </Card>
  );
}
