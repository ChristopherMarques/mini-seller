import { TrendingUp, Target, Zap } from "lucide-react";
import { DEFAULT_VALUES } from "@/components/shared";
import type { Opportunity } from "@/components/shared";
import type { KpiData, KpiCardItem } from "./types";

/**
 * Calcula os dados dos KPIs baseado nas oportunidades
 */
export const calculateKpiData = (opportunities: Opportunity[]): KpiData => {
  const opportunitiesCount = opportunities.length;
  
  return {
    opportunitiesCount,
    conversionRate: opportunitiesCount > 0 ? DEFAULT_VALUES.CONVERSION_RATE : 0,
    averageScore: opportunitiesCount > 0 ? DEFAULT_VALUES.AVERAGE_SCORE : 0,
  };
};

/**
 * Gera os itens de KPI para exibição
 */
export const generateKpiItems = (
  kpiData: KpiData,
  t: (key: string) => string
): KpiCardItem[] => {
  return [
    {
      title: t("kpi.opportunities_created"),
      value: kpiData.opportunitiesCount,
      icon: Target,
      gradient: "from-purple-500 to-blue-400",
    },
    {
      title: t("kpi.average_score"),
      value: kpiData.averageScore,
      icon: TrendingUp,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: t("kpi.conversion_rate"),
      value: `${kpiData.conversionRate}%`,
      icon: Zap,
      gradient: "from-cyan-400 to-purple-500",
    },
  ];
};

/**
 * Calcula o delay de animação para cada card
 */
export const getAnimationDelay = (index: number): string => {
  return `${index * 100}ms`;
};