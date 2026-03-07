"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  { name: "P1", score: 85 },
  { name: "P2", score: 72 },
  { name: "P3", score: 91 },
  { name: "P4", score: 68 },
  { name: "P5", score: 88 },
  { name: "P6", score: 79 },
];

const PerformanceChart = () => {
  const { theme } = useTheme();

  return (
    <div className="card-meltwater p-8">
      <h3 className="text-lg font-bold text-foreground mb-8 tracking-tight">
        Program Performance
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#1e293b" : "#e2e8f0"}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
              fontSize={12}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
              fontSize={12}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#0f1724" : "#ffffff",
                border:
                  "1px solid " + (theme === "dark" ? "#1e293b" : "#e2e8f0"),
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{
                color: theme === "dark" ? "#f8fafc" : "#1d2128",
              }}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="score"
              fill="#00c1b4"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
