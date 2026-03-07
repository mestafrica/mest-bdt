// src/components/dashboard/PerformanceChart.tsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 140 },
  { name: "Mar", value: 120 },
  { name: "Apr", value: 80 },
  { name: "May", value: 130 },
];

const PerformanceChart = () => {
  return (
    <section className="p-6 bg-[#0f1724] rounded-xl border border-slate-800 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-100">
          Program Performance
        </h2>
        <button className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-md border border-slate-700 transition-colors">
          View Report
        </button>
      </div>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "#0f1724",
                borderColor: "#1e293b",
                borderRadius: "8px",
                color: "#f1f5f9"
              }}
              itemStyle={{ color: "#3b82f6" }}
            />
            <Bar 
              dataKey="value" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PerformanceChart;
