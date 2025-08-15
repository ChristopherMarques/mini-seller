import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Zap } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Opportunity } from "@/types"

interface KpiCardsProps {
  opportunities: Opportunity[]
}

export function KpiCards({ opportunities }: KpiCardsProps) {
  const { t } = useTranslation()

  const opportunitiesCount = opportunities.length
  const conversionRate = opportunitiesCount > 0 ? 85 : 0 // Mock conversion rate
  const averageScore = opportunitiesCount > 0 ? 87 : 0 // Mock average score

  const kpis = [
    {
      title: t("kpi.opportunities_created"),
      value: opportunitiesCount,
      icon: Target,
      gradient: "from-purple-500 to-blue-400",
    },
    {
      title: t("kpi.average_score"),
      value: averageScore,
      icon: TrendingUp,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: t("kpi.conversion_rate"),
      value: `${conversionRate}%`,
      icon: Zap,
      gradient: "from-cyan-400 to-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card
            key={index}
            className="bg-white border-gray-200 hover-lift shadow-sm hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${kpi.gradient} hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
