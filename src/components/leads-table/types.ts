import type { Lead, FilterState, TableProps } from "@/components/shared";

export interface LeadsTableProps extends TableProps {
  onLeadClick: (_lead: Lead) => void;
}

export interface ScoreIndicatorProps {
  score: number;
}

export interface LeadRowProps {
  lead: Lead;
  onClick: (_lead: Lead) => void;
}

export interface TableFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (_value: string) => void;
  onStatusChange: (_value: string) => void;
}

export interface EmptyStateProps {
  searchTerm: string;
  statusFilter: string;
}

export type { Lead, FilterState };
