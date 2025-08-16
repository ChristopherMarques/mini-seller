import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Lead } from "@/types";
import { exportLeads, generateExportFilename, type ExportFormat } from "@/utils/export";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export interface ExportButtonsProps {
  leads: Lead[];
  searchTerm: string;
  statusFilter: string;
  disabled?: boolean;
}

export function ExportButtons({
  leads,
  searchTerm,
  statusFilter,
  disabled = false,
}: ExportButtonsProps) {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    if (leads.length === 0) {
      toast.error(t("leads.export.no_data"));
      return;
    }

    setIsExporting(true);

    try {
      const filename = generateExportFilename(searchTerm, statusFilter);
      const result = exportLeads(leads, format, filename);

      if (result.success) {
        toast.success(t("leads.export.success_message"));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(t("leads.export.unexpected_error"));
    } finally {
      setIsExporting(false);
    }
  };

  const exportCount = leads.length;
  const isFiltered = searchTerm || (statusFilter && statusFilter !== "all");

  return (
    <div data-tutorial="export">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={disabled || isExporting || exportCount === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? t("leads.export.exporting") : t("leads.export.button")}
            {exportCount > 0 && (
              <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {exportCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-xs text-muted-foreground border-b">
            {isFiltered
              ? t("leads.export.filtered_leads", { count: exportCount })
              : t("leads.export.all_leads", { count: exportCount })}
          </div>
          <DropdownMenuItem
            onClick={() => handleExport("excel")}
            disabled={isExporting}
            className="gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <div className="flex flex-col">
              <span>{t("leads.export.excel_format")}</span>
              <span className="text-xs text-muted-foreground">
                {t("leads.export.excel_description")}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("csv")}
            disabled={isExporting}
            className="gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            <div className="flex flex-col">
              <span>{t("leads.export.csv_format")}</span>
              <span className="text-xs text-muted-foreground">
                {t("leads.export.csv_description")}
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
