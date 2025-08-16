import React from "react";

export interface LeadImportDialogProps {
  children: React.ReactNode;
}

export interface ManualLeadForm {
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: "New" | "Contacted" | "Qualified";
}

export interface DialogState {
  open: boolean;
  loading: boolean;
  error: string;
  success: string;
  jsonInput: string;
  manualLead: ManualLeadForm;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LeadValidationResult {
  lead: any;
  validation: ValidationResult;
}

export interface JsonImportTabProps {
  jsonInput: string;
  setJsonInput: (_value: string) => void;
  error: string;
  success: string;
  loading: boolean;
  onImport: () => void;
  onCancel: () => void;
}

export interface ManualImportTabProps {
  manualLead: ManualLeadForm;
  setManualLead: React.Dispatch<React.SetStateAction<ManualLeadForm>>;
  error: string;
  success: string;
  loading: boolean;
  onAdd: () => void;
  onCancel: () => void;
}

export interface ImportActionsProps {
  loading: boolean;
  onCancel: () => void;
  onAction: () => void;
  actionText: string;
  loadingText: string;
  disabled?: boolean;
}
