import { KpiCards } from "@/components/kpi-cards";
import { useLeads } from "@/contexts/leads-provider";
import { useTranslation } from "react-i18next";
import { EmptyOpportunitiesState } from "./empty-opportunities-state";
import { OpportunitiesHeader } from "./opportunities-header";
import { OpportunitiesTableProps } from "./types";
import { hasOpportunities } from "./utils";

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  const { t } = useTranslation();
  const { leads } = useLeads();
  const showOpportunities = hasOpportunities(opportunities);

  return (
    <div className="space-y-8">
      <OpportunitiesHeader
        title={t("opportunities.title")}
        subtitle={t("opportunities.subtitle")}
      />

      <KpiCards opportunities={opportunities} leads={leads} />

      {!showOpportunities && <EmptyOpportunitiesState />}
    </div>
  );
}
