import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Target, Zap, Brain } from "lucide-react"
import { useTranslation } from "react-i18next"
import { AnimatedCounter } from "@/components/animated-counter"
import type { KPIData } from "@/lib/api"

interface KpiCardsProps {
  kpiData: KPIData | null
  loading: boolean
}

export function KpiCards({ kpiData, loading }: KpiCardsProps) {
  const { t } = useTranslation()

  if (loading || !kpiData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-white border-gray-200 shadow-sm animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-8 w-16 bg-gray-200" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const kpis = [
    {
      title: t("kpi.opportunities_created"),
      value: kpiData.opportunitiesCount,
      icon: Target,
      gradient: "from-purple-500 to-blue-400",
      suffix: "",
      decimals: 0,
    },
    {
      title: t("kpi.average_score"),
      value: kpiData.averageScore,
      icon: TrendingUp,
      gradient: "from-blue-400 to-cyan-400",
      suffix: "",
      decimals: 0,
    },
    {
      title: "Avg. Predictive Quality",
      value: kpiData.averagePredictiveQuality || 0,
      icon: Brain,
      gradient: "from-green-400 to-emerald-500",
      suffix: "",
      decimals: 0,
    },
    {
      title: t("kpi.conversion_rate"),
      value: kpiData.conversionRate,
      icon: Zap,
      gradient: "from-cyan-400 to-purple-500",
      suffix: "%",
      decimals: 1,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card
            key={index}
            className="bg-white border-gray-200 hover-lift shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter
                      value={kpi.value}
                      duration={2000 + index * 200}
                      suffix={kpi.suffix}
                      decimals={kpi.decimals}
                    />
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${kpi.gradient} hover:scale-110 transition-all duration-300 shadow-lg`}
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
