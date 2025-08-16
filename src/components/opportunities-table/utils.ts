import { Opportunity } from "@/types";
import i18n from "@/lib/i18n";

/**
 * Checks if there are opportunities to display
 */
export const hasOpportunities = (opportunities: Opportunity[]): boolean => {
  return opportunities.length > 0;
};

/**
 * Gets basic statistics of opportunities
 */
export const getOpportunitiesStats = (opportunities: Opportunity[]) => {
  const total = opportunities.length;
  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
  const averageValue = total > 0 ? totalValue / total : 0;

  return {
    total,
    totalValue,
    averageValue,
  };
};

/**
 * Formats monetary value for display with internationalization
 */
export const formatCurrency = (value: number): string => {
  const currentLanguage = i18n.language || "pt";

  // Define currency and locale based on language
  const localeConfig = {
    pt: { locale: "pt-BR", currency: "BRL" },
    en: { locale: "en-US", currency: "USD" },
  };

  const config = localeConfig[currentLanguage as keyof typeof localeConfig] || localeConfig.pt;

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(value);
};

/**
 * Gets CSS classes for the empty state
 */
export const getEmptyStateClasses = () => ({
  container: "text-center ",
  icon: "mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-200",
  title: "text-xl font-semibold text-foreground mb-3",
  subtitle: "text-muted-foreground mb-8 max-w-md mx-auto",
  button: "text-white btn-press hover:scale-105 transition-all duration-200 px-6 py-3",
});

/**
 * Gets CSS classes for the header
 */
export const getHeaderClasses = () => ({
  container: "flex items-center justify-between",
  title: "text-3xl font-bold gradient-text",
  subtitle: "text-muted-foreground mt-2",
});
