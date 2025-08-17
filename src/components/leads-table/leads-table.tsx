import { STATUS_COLORS } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
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
import { useOpportunities } from "@/contexts/opportunities-provider";
import { usePagination } from "@/hooks/use-pagination";
import {
  ArrowUpDown,
  BarChart3,
  Building,
  Check,
  Mail,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeadImportDialog } from "../lead-import-dialog";
import { ExportButtons } from "./export-buttons";
import { ScoreIndicator } from "./score-indicator";
import type { LeadsTableProps } from "./types";
import {
  getEmptyStateText,
  getFilteredLeads,
  getSearchResultsText,
  getStatusFilterOptions,
} from "./utils";

type SortOrder = "asc" | "desc" | null;

export function LeadsTable({ onLeadClick }: LeadsTableProps) {
  const { t } = useTranslation();
  const { leads, loading, deleteLead, updateLead } = useLeads();
  const { opportunities } = useOpportunities();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);
  const [scoreSortOrder, setScoreSortOrder] = useState<SortOrder>(null);
  const [editingEmail, setEditingEmail] = useState<number | null>(null);
  const [editingStatus, setEditingStatus] = useState<number | null>(null);
  const [tempEmail, setTempEmail] = useState("");
  const [tempStatus, setTempStatus] = useState("");

  const filteredLeads = getFilteredLeads(leads, searchTerm, statusFilter);
  const statusOptions = getStatusFilterOptions(t);
  const emptyStateText = getEmptyStateText(searchTerm, statusFilter, t);
  const hasOpportunities = opportunities.length > 0;

  const sortedLeads = useMemo(() => {
    if (!scoreSortOrder) return filteredLeads;

    return [...filteredLeads].sort((a, b) => {
      if (scoreSortOrder === "asc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
  }, [filteredLeads, scoreSortOrder]);

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedLeads,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination({
    data: sortedLeads,
    initialItemsPerPage: 10,
    initialPage: 1,
  });

  const handleScoreSort = () => {
    if (scoreSortOrder === null) {
      setScoreSortOrder("desc");
    } else if (scoreSortOrder === "desc") {
      setScoreSortOrder("asc");
    } else {
      setScoreSortOrder(null);
    }
  };

  const handleEmailEdit = (leadId: number, currentEmail: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingEmail(leadId);
    setTempEmail(currentEmail);
  };

  const handleEmailSave = (leadId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (tempEmail.trim() && emailRegex.test(tempEmail.trim())) {
      updateLead(leadId, { email: tempEmail.trim() });
      setEditingEmail(null);
      setTempEmail("");
    }
  };

  const handleEmailCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingEmail(null);
    setTempEmail("");
  };

  const handleStatusEdit = (leadId: number, currentStatus: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingStatus(leadId);
    setTempStatus(currentStatus);
  };

  const handleStatusSave = (leadId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    updateLead(leadId, { status: tempStatus as any });
    setEditingStatus(null);
    setTempStatus("");
  };

  const handleStatusCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingStatus(null);
    setTempStatus("");
  };

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
            {totalItems > 0
              ? t(
                  "leads.table.showing_results",
                  "Mostrando {{start}} - {{end}} de {{total}} leads",
                  {
                    start: (currentPage - 1) * itemsPerPage + 1,
                    end: Math.min(currentPage * itemsPerPage, totalItems),
                    total: totalItems,
                  },
                )
              : getSearchResultsText(filteredLeads.length, leads.length, t)}
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
            className="pl-10 border-primary/50 shadow-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 border-primary/50 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-primary/50 shadow-sm bg-background">
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasOpportunities && (
          <LeadImportDialog>
            <Button>
              <Plus className="h-4 w-4" />
              {t("leads.import_button")}
            </Button>
          </LeadImportDialog>
        )}
        <ExportButtons leads={filteredLeads} searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>

      {/* Table */}
      {totalItems > 0 ? (
        <div className="bg-card rounded-lg border overflow-hidden border-primary/50 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-primary/50 shadow-sm">
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
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold text-foreground hover:bg-transparent"
                    onClick={handleScoreSort}
                    title={
                      scoreSortOrder === null
                        ? t("leads.table.sort_score_desc")
                        : scoreSortOrder === "desc"
                          ? t("leads.table.sort_score_asc")
                          : t("leads.table.sort_score_none")
                    }
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      {t("leads.table.score")}
                      <ArrowUpDown
                        className={`h-4 w-4 transition-colors ${
                          scoreSortOrder ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </Button>
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
              {paginatedLeads.map(lead => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-primaryOpacity-foreground dark:hover:bg-secondary cursor-pointer border-primary/50 shadow-sm"
                  onClick={() => onLeadClick(lead)}
                >
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.company}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {editingEmail === lead.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={tempEmail}
                          onChange={e => setTempEmail(e.target.value)}
                          className={`h-8 text-sm ${
                            tempEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempEmail.trim())
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                          autoFocus
                          placeholder={t("leads.table.email_placeholder", "Digite um email válido")}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              handleEmailSave(lead.id, e as any);
                            } else if (e.key === "Escape") {
                              handleEmailCancel(e as any);
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => handleEmailSave(lead.id, e)}
                          disabled={
                            !tempEmail.trim() ||
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempEmail.trim())
                          }
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t("common.save", "Salvar")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEmailCancel}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title={t("common.cancel", "Cancelar")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <span>{lead.email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => handleEmailEdit(lead.id, lead.email, e)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          title={t("leads.table.edit_email", "Editar email")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <ScoreIndicator score={lead.score} />
                  </TableCell>
                  <TableCell>
                    {editingStatus === lead.id ? (
                      <div className="flex items-center gap-2">
                        <Select value={tempStatus} onValueChange={setTempStatus}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">{t("leads.status.new")}</SelectItem>
                            <SelectItem value="Contacted">{t("leads.status.contacted")}</SelectItem>
                            <SelectItem value="Qualified">{t("leads.status.qualified")}</SelectItem>
                            <SelectItem value="Converted">{t("leads.status.converted")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => handleStatusSave(lead.id, e)}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          title={t("common.save", "Salvar")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleStatusCancel}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title={t("common.cancel", "Cancelar")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <Badge className={STATUS_COLORS[lead.status]}>
                          {t(`leads.status.${lead.status.toLowerCase()}`)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => handleStatusEdit(lead.id, lead.status, e)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          title={t("leads.table.edit_status", "Editar status")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
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

      {/* Paginação */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
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
