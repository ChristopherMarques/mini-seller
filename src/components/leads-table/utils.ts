import { getScoreClass, getScoreWidth, filterLeads, type Lead } from "@/components/shared";

/**
 * Filters leads based on search criteria and status
 */
export const getFilteredLeads = (
  leads: Lead[],
  searchTerm: string,
  statusFilter: string,
): Lead[] => {
  return filterLeads(leads, searchTerm, statusFilter);
};

/**
 * Generates CSS classes for the score indicator
 */
export const getScoreIndicatorClasses = (score: number) => {
  return {
    scoreClass: getScoreClass(score),
    width: getScoreWidth(score),
  };
};

/**
 * Generates status options for the filter
 */
export const getStatusFilterOptions = (t: (_key: string, _options?: any) => string) => [
  { value: "all", label: t("leads.filter.all_status") },
  { value: "New", label: t("leads.status.new") },
  { value: "Contacted", label: t("leads.status.contacted") },
  { value: "Qualified", label: t("leads.status.qualified") },
  { value: "Converted", label: t("leads.status.converted") },
];

/**
 * Formats the search results text
 */
export const getSearchResultsText = (
  filteredCount: number,
  totalCount: number,
  t: (_key: string, _options?: any) => string,
): string => {
  if (filteredCount === totalCount) {
    return t("leads.showing_all", { count: totalCount });
  }
  return t("leads.showing_filtered", {
    filtered: filteredCount,
    total: totalCount,
  });
};

/**
 * Checks if there are active filters
 */
export const hasActiveFilters = (searchTerm: string, statusFilter: string): boolean => {
  return searchTerm.trim() !== "" || statusFilter !== "all";
};

/**
 * Generates empty state text based on filters
 */
export const getEmptyStateText = (
  searchTerm: string,
  statusFilter: string,
  t: (_key: string, _options?: any) => string,
) => {
  if (hasActiveFilters(searchTerm, statusFilter)) {
    return {
      title: t("leads.empty.no_results_title"),
      subtitle: t("leads.empty.no_results_subtitle"),
    };
  }

  return {
    title: t("leads.empty.no_leads_title"),
    subtitle: t("leads.empty.no_leads_subtitle"),
  };
};
