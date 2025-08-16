import { validateEmail, type Lead } from "@/components/shared";

/**
 * Simula uma chamada de API para salvar lead
 */
export const simulateSaveApi = (lead: Lead): Promise<Lead> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(lead);
    }, 1000);
  });
};

/**
 * Simula uma chamada de API para converter lead
 */
export const simulateConvertApi = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

/**
 * Valida os dados do lead no formulário
 */
export const validateLeadForm = (lead: Lead, t: (_key: string) => string) => {
  if (!validateEmail(lead.email).isValid) {
    return {
      isValid: false,
      message: t("detail_sheet.messages.invalid_email"),
    };
  }

  if (!lead.email.trim()) {
    return {
      isValid: false,
      message: t("detail_sheet.messages.email_required"),
    };
  }

  return { isValid: true };
};

/**
 * Gera as classes CSS para o score baseado no valor
 */
export const getScoreGradientClass = (score: number): string => {
  if (score >= 90) {
    return "bg-gradient-to-r from-green-500 to-green-400";
  }
  if (score >= 70) {
    return "bg-gradient-to-r from-yellow-500 to-yellow-400";
  }
  return "bg-gradient-to-r from-red-500 to-red-400";
};

/**
 * Calcula a largura da barra de score
 */
export const getScoreBarWidth = (score: number): number => {
  return Math.max(score, 10);
};

/**
 * Gera as iniciais do nome para o avatar
 */
export const getInitials = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

/**
 * Gera as opções de status para o select
 */
export const getStatusOptions = (t: (_key: string) => string) => [
  { value: "New", label: t("leads.status.new") },
  { value: "Contacted", label: t("leads.status.contacted") },
  { value: "Qualified", label: t("leads.status.qualified") },
];

/**
 * Reseta o estado do formulário
 */
export const resetFormState = () => ({
  loading: false,
  saving: false,
  converting: false,
  error: null,
  success: null,
});

/**
 * Gera classes CSS para inputs com erro
 */
export const getInputErrorClasses = (hasError: boolean): string => {
  const baseClasses =
    "bg-white border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200";

  if (hasError) {
    return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-500/20`;
  }

  return baseClasses;
};
