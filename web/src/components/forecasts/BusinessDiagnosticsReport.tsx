"use client";

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw
} from 'lucide-react';

// Data 
const businessData = [
  { name: 'Key Partners', percentage: 53, score: 5.25 },
  { name: 'Key Activities', percentage: 17, score: 1.71 },
  { name: 'Value Proposition', percentage: 95, score: 9.50 },
  { name: 'Customer Relationships', percentage: 30, score: 3.00 },
  { name: 'Customer Segments', percentage: 0, score: 0.00 },
  { name: 'Key Resources', percentage: -50, score: -5.00 },
  { name: 'Channels', percentage: -28, score: -2.80 },
  { name: 'Cost Structures', percentage: 35, score: 3.50 },
  { name: 'Revenue Streams', percentage: 89, score: 8.86 }
];

// Helper function for bar colors
const getBarColor = (percentage: number) => {
  if (percentage >= 70) return '#10B981'; // Green
  if (percentage >= 50) return '#3B82F6'; // Blue
  if (percentage >= 30) return '#F59E0B'; // Yellow
  if (percentage >= 0) return '#EF4444'; // Red
  return '#8B5CF6'; // Purple for negative
};

export default function BusinessDiagnosticsReport() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const overallScore = 5.33;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleExport = () => {
    console.log('Exporting report...');
  };

  const CustomXAxisTick = ({ x, y, payload }: { 
    x: string | number; 
    y: string | number; 
    payload: { value: string } 
  }) => {
    const words = payload.value.split(' ');
    const xNum = typeof x === 'string' ? parseFloat(x) : x;
    const yNum = typeof y === 'string' ? parseFloat(y) : y;

    return (
      <text x={xNum} y={yNum + 10} textAnchor="middle" fontSize={10} fill="#6B7280">
        {words.map((word: string, index: number) => (
          <tspan
            key={index}
            x={xNum}
            dy={index === 0 ? 0 : 12}
          >
            {word}
          </tspan>
        ))}
      </text>
    );
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span>Business Diagnostics</span>
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${overallScore >= 7 ? 'bg-green-100 text-green-800' :
            overallScore >= 5 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
            {overallScore.toFixed(2)}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-2 px-1 pb-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Business Model Canvas Diagnostic</h3>
              <p className="text-xs text-gray-600">9 business areas evaluated</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="p-1.5 bg-white rounded-lg shadow-sm text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleExport}
                className="p-1.5 bg-white rounded-lg shadow-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Overall Diagnostic Score</span>
              <span className="text-lg font-bold text-gray-900">{overallScore.toFixed(2)} / 10</span>
            </div>
            <div className="mt-1.5 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${overallScore >= 7 ? 'bg-green-500' :
                  overallScore >= 5 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                style={{ width: `${(overallScore / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Performance by Business Area
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={businessData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={CustomXAxisTick}
                    height={60}
                  />
                  <YAxis
                    domain={[-60, 100]}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                            <p className="font-medium text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-600">
                              Score: <span className="font-bold">{data.score.toFixed(2)}/10</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Percentage: <span className="font-bold">{data.percentage}%</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                    {businessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 ">
            {businessData.map((item) => (
              <div
                key={item.name}
                className="bg-white border  border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-normal text-gray-700 truncate">
                    {item.name}
                  </span>

                  <span
                    className={`text-[10px]  px-1 py-0 rounded ${item.percentage >= 70
                      ? "bg-green-100 text-green-800"
                      : item.percentage >= 50
                        ? "bg-blue-100 text-blue-800"
                        : item.percentage >= 30
                          ? "bg-yellow-100 text-yellow-800"
                          : item.percentage >= 0
                            ? "bg-red-100 text-red-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                  >
                    Score: {item.score.toFixed(2)}
                  </span>
                </div>

                {/* Percentage*/}
                <div className="text-3xl font-medium text-gray-900 leading-tight">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap gap-3 px-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Excellent (70%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Good (50-69%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Warning (30-49%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Critical (0-29%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-600">Negative (&lt;0%)</span>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-linear-to-r from-yellow-50 to-red-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">Key Insights</h4>
                <ul className="text-xs text-gray-700 mt-1 space-y-0.5">
                  <li>• <span className="font-medium text-green-600">Value Proposition (95%)</span> and <span className="font-medium text-green-600">Revenue Streams (89%)</span> are strong</li>
                  <li>• <span className="font-medium text-red-600">Key Resources (-50%)</span> and <span className="font-medium text-red-600">Channels (-28%)</span> need immediate attention</li>
                  <li>• <span className="font-medium text-red-600">Customer Segments (0%)</span> and <span className="font-medium text-red-600">Key Activities (17%)</span> need improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}