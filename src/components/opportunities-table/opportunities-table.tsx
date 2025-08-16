import { KpiCards } from "@/components/kpi-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeads } from "@/contexts/leads-provider";
import { useOpportunities } from "@/contexts/opportunities-provider";
import { useTranslation } from "react-i18next";
import { EditableAmountCell } from "./editable-amount-cell";
import { EmptyOpportunitiesState } from "./empty-opportunities-state";
import { OpportunitiesHeader } from "./opportunities-header";
import { OpportunitiesTableProps } from "./types";
import { hasOpportunities } from "./utils";

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  const { t } = useTranslation();
  const { leads } = useLeads();
  const { updateOpportunity } = useOpportunities();
  const showOpportunities = hasOpportunities(opportunities);

  const handleAmountUpdate = (opportunityId: number, newAmount: number) => {
    updateOpportunity(opportunityId, { amount: newAmount });
  };

  return (
    <div className="space-y-8">
      <OpportunitiesHeader
        title={t("opportunities.title")}
        subtitle={t("opportunities.subtitle")}
      />

      <KpiCards opportunities={opportunities} leads={leads} />

      {showOpportunities ? (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="gradient-text">{t("opportunities.table.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("opportunities.table.name")}</TableHead>
                  <TableHead>{t("opportunities.table.account")}</TableHead>
                  <TableHead>{t("opportunities.table.stage")}</TableHead>
                  <TableHead className="text-right">{t("opportunities.table.amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map(opportunity => (
                  <TableRow key={opportunity.id}>
                    <TableCell className="font-medium">{opportunity.name}</TableCell>
                    <TableCell>{opportunity.accountName}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {opportunity.stage}
                      </span>
                    </TableCell>
                    <TableCell className="text-right" data-tutorial="amount-edit">
                      <EditableAmountCell
                        value={opportunity.amount}
                        onSave={newAmount => handleAmountUpdate(opportunity.id, newAmount)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyOpportunitiesState />
      )}
    </div>
  );
}
