import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import type { KpiCardsProps } from "./types";
import { calculateKpiData, generateKpiItems, getAnimationDelay } from "./utils";

export function KpiCards({ opportunities, leads = [] }: KpiCardsProps) {
  const { t } = useTranslation();

  const kpiData = calculateKpiData(opportunities, leads);
  const kpiItems = generateKpiItems(kpiData, t);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpiItems.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card
            key={index}
            className="bg-white border-gray-200 hover-lift shadow-sm hover:shadow-md transition-all duration-200"
            style={{ animationDelay: getAnimationDelay(index) }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${kpi.gradient} hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
