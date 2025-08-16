import { ManualLeadForm, ValidationResult } from "./types";

/**
 * Valida um lead individual durante a importação
 */
export const validateLead = (
  lead: any,
  index: number,
  t: (_key: string) => string,
): ValidationResult => {
  const errors: string[] = [];

  if (!lead || typeof lead !== "object") {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_object")}`);
    return { isValid: false, errors };
  }

  if (typeof lead.name !== "string" || lead.name.trim() === "") {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_name")}`);
  }

  if (typeof lead.company !== "string" || lead.company.trim() === "") {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_company")}`);
  }

  if (typeof lead.email !== "string" || lead.email.trim() === "") {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_email")}`);
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_email_format")}`);
    }
  }

  if (typeof lead.source !== "string" || lead.source.trim() === "") {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_source")}`);
  }

  if (typeof lead.score !== "number" || lead.score < 0 || lead.score > 100) {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_score")}`);
  }

  if (typeof lead.status !== "string" || !["New", "Contacted", "Qualified"].includes(lead.status)) {
    errors.push(`Lead ${index + 1}: ${t("leads.import.error_invalid_status")}`);
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Valida o formulário manual de lead
 */
export const validateManualLead = (
  manualLead: ManualLeadForm,
  t: (_key: string) => string,
): ValidationResult => {
  const errors: string[] = [];

  if (!manualLead.name || !manualLead.company || !manualLead.email || !manualLead.source) {
    errors.push(t("leads.import.error_required_fields"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (manualLead.email && !emailRegex.test(manualLead.email)) {
    errors.push(t("detail_sheet.messages.invalid_email"));
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Processa a importação de leads via JSON
 */
export const processJsonImport = (jsonInput: string, t: (_key: string) => string) => {
  const parsedLeads = JSON.parse(jsonInput) as any[];

  if (!Array.isArray(parsedLeads)) {
    throw new Error(t("leads.import.error_invalid_json"));
  }

  if (parsedLeads.length === 0) {
    throw new Error(t("leads.import.error_empty_json"));
  }

  const validationResults = parsedLeads.map((lead: any, index: number) => ({
    lead,
    validation: validateLead(lead, index, t),
  }));

  const validLeads = validationResults
    .filter(result => result.validation.isValid)
    .map(result => result.lead);
  const allErrors = validationResults.flatMap(result => result.validation.errors);

  if (allErrors.length > 0 && validLeads.length === 0) {
    throw new Error(
      `${t("leads.import.error_validation_failed")}:\n${allErrors.slice(0, 5).join("\n")}${allErrors.length > 5 ? `\n${t("leads.import.error_more_errors")}` : ""}`,
    );
  }

  if (allErrors.length > 0) {
    console.warn("Validation errors found:", allErrors);
  }

  return { validLeads, allErrors };
};

/**
 * Gera mensagem de sucesso para importação
 */
export const getImportSuccessMessage = (
  validCount: number,
  errorCount: number,
  t: (_key: string) => string,
): string => {
  return `${t("leads.import.success_import")} ${validCount} ${t("leads.import.leads_imported")}${errorCount > 0 ? `, ${errorCount} ${t("leads.import.invalid_ignored")}` : ""}.`;
};

/**
 * Estado inicial para o formulário manual
 */
export const getInitialManualLead = (): ManualLeadForm => ({
  name: "",
  company: "",
  email: "",
  source: "",
  score: 50,
  status: "New",
});

/**
 * Opções de status para o select
 */
export const getStatusOptions = (t: (_key: string) => string) => [
  { value: "New", label: t("leads.status.new") },
  { value: "Contacted", label: t("leads.status.contacted") },
  { value: "Qualified", label: t("leads.status.qualified") },
];

/**
 * Placeholder para o JSON de exemplo
 */
export const getJsonPlaceholder = () => `[
  {
    "name": "João Silva",
    "company": "Tech Corp",
    "email": "joao@techcorp.com",
    "source": "Website",
    "score": 85,
    "status": "New"
  },
  {
    "name": "Maria Santos",
    "company": "Digital Solutions",
    "email": "maria@digital.com",
    "source": "LinkedIn",
    "score": 92,
    "status": "Qualified"
  }
]`;
