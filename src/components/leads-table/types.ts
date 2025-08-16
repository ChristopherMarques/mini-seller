import type { Lead, FilterState, TableProps } from "@/components/shared";

export interface LeadsTableProps extends TableProps {
  onLeadClick: (lead: Lead) => void;
}

export interface ScoreIndicatorProps {
  score: number;
}

export interface LeadRowProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export interface TableFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export interface EmptyStateProps {
  searchTerm: string;
  statusFilter: string;
}

export type { Lead, FilterState };