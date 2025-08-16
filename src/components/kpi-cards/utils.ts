import { type Lead, type Opportunity } from "@/components/shared";
import { Target, TrendingUp, Zap } from "lucide-react";
import type { KpiCardItem, KpiData } from "./types";

/**
 * Calculates KPI data based on opportunities and leads
 */
export const calculateKpiData = (opportunities: Opportunity[], leads: Lead[] = []): KpiData => {
  const opportunitiesCount = opportunities.length;

  // Calculate average score of leads
  const averageScore =
    leads.length > 0
      ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
      : 0;

  // Calculate conversion rate based on qualified leads vs total leads
  const qualifiedLeads = leads.filter(lead => lead.status === "Qualified").length;
  const conversionRate = leads.length > 0 ? Math.round((qualifiedLeads / leads.length) * 100) : 0;

  return {
    opportunitiesCount,
    conversionRate,
    averageScore,
  };
};

/**
 * Generates KPI items for display
 */
export const generateKpiItems = (kpiData: KpiData, t: (_key: string) => string): KpiCardItem[] => {
  return [
    {
      title: t("kpi.opportunities_created"),
      value: kpiData.opportunitiesCount,
      icon: Target,
      gradient: "bg-gradient-primary",
    },
    {
      title: t("kpi.average_score"),
      value: kpiData.averageScore,
      icon: TrendingUp,
      gradient: "bg-gradient-primary",
    },
    {
      title: t("kpi.conversion_rate"),
      value: `${kpiData.conversionRate}%`,
      icon: Zap,
      gradient: "bg-gradient-primary",
    },
  ];
};

/**
 * Calculates animation delay for each card
 */
export const getAnimationDelay = (index: number): string => {
  return `${index * 100}ms`;
};
