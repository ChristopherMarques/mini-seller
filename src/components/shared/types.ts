import React from "react";

export type LeadStatus = "New" | "Contacted" | "Qualified";

export type LanguageCode = "en" | "pt";

export interface Language {
  code: LanguageCode;
  label: string;
}

export interface KpiItem {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TableProps extends BaseComponentProps {
  loading?: boolean;
}

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

export type { Lead, Opportunity } from "@/types";
