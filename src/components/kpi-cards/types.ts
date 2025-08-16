import type { Opportunity, KpiItem } from "@/components/shared";
import type { LucideIcon } from "lucide-react";

export interface KpiCardsProps {
  opportunities: Opportunity[];
}

export interface KpiData {
  opportunitiesCount: number;
  conversionRate: number;
  averageScore: number;
}

export interface KpiCardItem extends Omit<KpiItem, 'icon'> {
  icon: LucideIcon;
}