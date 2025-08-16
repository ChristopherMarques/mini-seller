import type { Lead, FormState } from "@/components/shared";

export interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConvert: (lead: Lead) => void;
  onSave: (lead: Lead) => void;
}

export interface LeadFormData extends Lead {
  
}

export interface SheetState extends FormState {
  saving: boolean;
  converting: boolean;
}

export interface LeadHeaderProps {
  lead: Lead;
}

export interface LeadFormFieldsProps {
  editedLead: Lead;
  onLeadChange: (lead: Lead) => void;
  hasError: boolean;
  t: (key: string) => string;
}

export interface LeadInfoDisplayProps {
  lead: Lead;
  t: (key: string) => string;
}

export interface SheetActionsProps {
  onSave: () => void;
  onConvert: () => void;
  onCancel: () => void;
  saving: boolean;
  converting: boolean;
  t: (key: string) => string;
}

export type { Lead };