import { Opportunity } from "@/components/shared";

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
