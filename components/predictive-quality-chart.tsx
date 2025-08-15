"use client"

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"

interface PredictiveQualityChartProps {
  quality: number
  size?: number
}

export function PredictiveQualityChart({ quality, size = 120 }: PredictiveQualityChartProps) {
  const data = [
    {
      name: "Quality",
      value: quality,
      fill: getQualityColor(quality),
    },
  ]

  function getQualityColor(quality: number) {
    if (quality >= 80) return "#10B981" // Green
    if (quality >= 60) return "#F59E0B" // Yellow
    return "#EF4444" // Red
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={data}>
          <RadialBar dataKey="value" cornerRadius={10} fill={data[0].fill} background={{ fill: "#F3F4F6" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{quality}</div>
          <div className="text-xs text-gray-500 font-medium">Quality</div>
        </div>
      </div>
    </div>
  )
}
