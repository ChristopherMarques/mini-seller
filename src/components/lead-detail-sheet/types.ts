import type { Lead, FormState } from "@/components/shared";

export interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  onConvert: (_lead: Lead) => void;
  onSave: (_lead: Lead) => void;
}

export interface LeadFormData extends Lead {}

export interface SheetState extends FormState {
  saving: boolean;
  converting: boolean;
}

export interface LeadHeaderProps {
  lead: Lead;
}

export interface LeadFormFieldsProps {
  editedLead: Lead;
  onLeadChange: (_lead: Lead) => void;
  hasError: boolean;
  t: (_key: string) => string;
}

export interface LeadInfoDisplayProps {
  lead: Lead;
  t: (_key: string) => string;
}

export interface SheetActionsProps {
  onSave: () => void;
  onConvert: () => void;
  onCancel: () => void;
  saving: boolean;
  converting: boolean;
  t: (_key: string) => string;
}

export type { Lead };
