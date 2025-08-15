"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTranslation } from "react-i18next"
import type { Lead } from "@/lib/api"

interface AnalyticsSectionProps {
  leads: Lead[]
  loading: boolean
}

export function AnalyticsSection({ leads, loading }: AnalyticsSectionProps) {
  const { t } = useTranslation()

  // Calculate leads by source
  const leadsBySource = leads.reduce(
    (acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const sourceData = Object.entries(leadsBySource).map(([source, count]) => ({
    source,
    count,
  }))

  // Calculate conversion funnel data
  const totalLeads = leads.length
  const contactedLeads = leads.filter((lead) => lead.status !== "New").length
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length

  const funnelData = [
    { stage: t("analytics.funnel.total"), count: totalLeads, percentage: 100 },
    {
      stage: t("analytics.funnel.contacted"),
      count: contactedLeads,
      percentage: totalLeads > 0 ? Math.round((contactedLeads / totalLeads) * 100) : 0,
    },
    {
      stage: t("analytics.funnel.qualified"),
      count: qualifiedLeads,
      percentage: totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0,
    },
    {
      stage: t("analytics.funnel.converted"),
      count: convertedLeads,
      percentage: totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0,
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">{t("analytics.title")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">{t("analytics.title")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("analytics.leadsBySource.title")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="source" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#374151", fontWeight: "medium" }}
              />
              <Bar
                dataKey="count"
                fill="#A073FA"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("analytics.conversionFunnel.title")}</h3>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{stage.count}</span>
                    <span className="text-xs text-purple-600 font-medium">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${stage.percentage}%`,
                      animationDelay: `${index * 200}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
