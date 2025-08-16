import { STATUS_COLORS } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeads } from "@/contexts/leads-provider";
import { BarChart3, Building, Mail, Search, Trash2, Users } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScoreIndicator } from "./score-indicator";
import type { LeadsTableProps } from "./types";
import {
  getEmptyStateText,
  getFilteredLeads,
  getSearchResultsText,
  getStatusFilterOptions,
} from "./utils";

export function LeadsTable({ onLeadClick }: LeadsTableProps) {
  const { t } = useTranslation();
  const { leads, loading, deleteLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  const filteredLeads = getFilteredLeads(leads, searchTerm, statusFilter);
  const statusOptions = getStatusFilterOptions(t);
  const emptyStateText = getEmptyStateText(searchTerm, statusFilter, t);

  const handleDeleteClick = (leadId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setLeadToDelete(leadId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete);
      setLeadToDelete(null);
    }
  };

  const getLeadName = () => {
    if (leadToDelete) {
      const lead = leads.find(l => l.id === leadToDelete);
      return lead ? lead.name : "";
    }
    return "";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="border rounded-lg">
          <div className="p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4 py-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">{t("leads.title")}</h2>
          <p className="text-muted-foreground mt-2">
            {getSearchResultsText(filteredLeads.length, leads.length, t)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 " />
          <Input
            placeholder={t("leads.table.search_placeholder")}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 shadow-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 border-gray-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-gray-200 shadow-sm bg-background">
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredLeads.length > 0 ? (
        <div className="bg-card rounded-lg border overflow-hidden border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-gray-200 shadow-sm">
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t("leads.table.name")}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {t("leads.table.company")}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("leads.table.email")}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {t("leads.table.score")}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {t("leads.table.status")}
                </TableHead>
                <TableHead className="font-semibold text-foreground w-20">
                  {t("common.actions", "Ações")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-muted/50 cursor-pointer transition-colors border-gray-200 shadow-sm"
                  onClick={() => onLeadClick(lead)}
                >
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.company}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell>
                    <ScoreIndicator score={lead.score} />
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[lead.status]}>
                      {t(`leads.status.${lead.status.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => handleDeleteClick(lead.id, e)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-card rounded-lg border shadow-sm p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{emptyStateText.title}</h3>
          <p className="text-muted-foreground">{emptyStateText.subtitle}</p>
        </div>
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={getLeadName()}
      />
    </div>
  );
}
