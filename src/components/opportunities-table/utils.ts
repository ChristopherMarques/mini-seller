import { Opportunity } from "@/components/shared";

/**
 * Verifica se há oportunidades para exibir
 */
export const hasOpportunities = (opportunities: Opportunity[]): boolean => {
  return opportunities.length > 0;
};

/**
 * Obtém estatísticas básicas das oportunidades
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
 * Formata valor monetário para exibição
 */
export const formatCurrency = (value: number, currency: string = "BRL"): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
};

/**
 * Obtém classes CSS para o estado vazio
 */
export const getEmptyStateClasses = () => ({
  container: "text-center",
  icon: "mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-200",
  title: "text-xl font-semibold text-gray-900 mb-3",
  subtitle: "text-gray-600 mb-8 max-w-md mx-auto",
  button:
    "bg-purple-500 hover:bg-purple-600 text-white btn-press hover:scale-105 transition-all duration-200 px-6 py-3 rounded-full",
});

/**
 * Obtém classes CSS para o cabeçalho
 */
export const getHeaderClasses = () => ({
  container: "flex items-center justify-between",
  title: "text-3xl font-bold gradient-text",
  subtitle: "text-gray-600 mt-2",
});
