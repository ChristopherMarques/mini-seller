import i18n from "@/lib/i18n";
import type { Lead } from "@/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const prepareLeadsForExport = (leads: Lead[]) => {
  const t = i18n.t;

  return leads.map(lead => ({
    [t("leads.export.columns.id")]: lead.id,
    [t("leads.export.columns.name")]: lead.name,
    [t("leads.export.columns.company")]: lead.company,
    [t("leads.export.columns.email")]: lead.email,
    [t("leads.export.columns.source")]: lead.source,
    [t("leads.export.columns.score")]: lead.score,
    [t("leads.export.columns.status")]: lead.status,
  }));
};

export const exportToExcel = (leads: Lead[], filename: string = "leads") => {
  try {
    const exportData = prepareLeadsForExport(leads);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const columnWidths = [
      { wch: 8 },
      { wch: 25 },
      { wch: 30 },
      { wch: 35 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    saveAs(blob, `${filename}_${timestamp}.xlsx`);

    return { success: true, filename: `${filename}_${timestamp}.xlsx` };
  } catch (error) {
    console.error("Erro ao exportar para Excel:", error);
    return { success: false, message: "Export error" };
  }
};

export const exportToCSV = (leads: Lead[], filename: string = "leads") => {
  try {
    const exportData = prepareLeadsForExport(leads);

    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(","),
      ...exportData.map(row =>
        headers
          .map(header => {
            const value = row[header as keyof typeof row];
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    saveAs(blob, `${filename}_${timestamp}.csv`);

    return { success: true, filename: `${filename}_${timestamp}.csv` };
  } catch (error) {
    return { success: false, message: "Export error" };
  }
};

export const generateExportFilename = (searchTerm: string, statusFilter: string): string => {
  let filename = "leads";

  if (searchTerm) {
    filename += `_busca-${searchTerm.replace(/[^a-zA-Z0-9]/g, "-")}`;
  }

  if (statusFilter && statusFilter !== "all") {
    filename += `_status-${statusFilter.toLowerCase()}`;
  }

  return filename;
};

export interface ExportResult {
  success: boolean;
  message?: string;
  filename?: string;
}

export type ExportFormat = "excel" | "csv";

export const exportLeads = (
  leads: Lead[],
  format: ExportFormat,
  filename?: string,
): ExportResult => {
  const exportFilename = filename || "leads";

  switch (format) {
    case "excel":
      return exportToExcel(leads, exportFilename);
    case "csv":
      return exportToCSV(leads, exportFilename);
    default:
      return { success: false, message: "Unsupported export format" };
  }
};
