export { OpportunitiesTable } from "./opportunities-table";
export { OpportunitiesHeader } from "./opportunities-header";
export { EmptyOpportunitiesState } from "./empty-opportunities-state";

export type {
  OpportunitiesTableProps,
  EmptyOpportunitiesStateProps,
  OpportunitiesHeaderProps,
} from "./types";

export {
  hasOpportunities,
  getOpportunitiesStats,
  formatCurrency,
  getEmptyStateClasses,
  getHeaderClasses,
} from "./utils";

export type { Opportunity } from "@/components/shared";
