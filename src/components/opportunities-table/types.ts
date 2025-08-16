import { Opportunity } from "@/types";

export interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

export interface EmptyOpportunitiesStateProps {
  onImportClick?: () => void;
}

export interface OpportunitiesHeaderProps {
  title: string;
  subtitle: string;
}
