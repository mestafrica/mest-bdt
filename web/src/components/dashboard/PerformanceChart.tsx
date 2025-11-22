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
    <section className="p-6 bg-white dark:bg-[#1a1d24] rounded-2xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Program Performance
        </h2>
        <button className="text-sm bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
          View Report
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
            />
            <XAxis dataKey="name" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1d24",
                borderColor: "#4a5568",
              }}
            />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PerformanceChart;
