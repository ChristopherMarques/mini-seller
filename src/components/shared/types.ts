// Tipos compartilhados entre componentes

import type { Lead, Opportunity } from "@/types";

// Tipos para status de leads
export type LeadStatus = "New" | "Contacted" | "Qualified";

// Tipos para idiomas
export type LanguageCode = "en" | "pt";

export interface Language {
  code: LanguageCode;
  label: string;
}

// Tipos para KPIs
export interface KpiItem {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

// Tipos para props comuns
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Tipos para componentes de tabela
export interface TableProps extends BaseComponentProps {
  loading?: boolean;
}

// Tipos para filtros
export interface FilterState {
  searchTerm: string;
  statusFilter: string;
}


export interface FormState {
  loading: boolean;
  error: string | null;
  success: string | null;
}


export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Re-exportar tipos principais para facilitar imports
export type { Lead, Opportunity };