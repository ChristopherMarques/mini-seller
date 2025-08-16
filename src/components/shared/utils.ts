import { SCORE_CLASSES, SCORE_CONFIG } from "./constants";
import type { ValidationResult } from "./types";

/**
 * Valida formato de email
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    isValid,
    message: isValid ? undefined : "Email inválido"
  };
};

/**
 * Retorna a classe CSS apropriada para o score
 */
export const getScoreClass = (score: number): string => {
  if (score >= SCORE_CONFIG.HIGH_THRESHOLD) return SCORE_CLASSES.HIGH;
  if (score >= SCORE_CONFIG.MEDIUM_THRESHOLD) return SCORE_CLASSES.MEDIUM;
  return SCORE_CLASSES.LOW;
};

/**
 * Calcula a largura da barra de score
 */
export const getScoreWidth = (score: number): number => {
  return Math.max(score, SCORE_CONFIG.MIN_WIDTH);
};

/**
 * Filtra leads baseado em termo de busca e status
 */
export const filterLeads = (
  leads: any[],
  searchTerm: string,
  statusFilter: string
) => {
  return leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
};

/**
 * Gera ID único para novos leads
 */
export const generateLeadId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Formata texto para exibição
 */
export const formatText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Valida dados de lead
 */
export const validateLeadData = (lead: any): ValidationResult => {
  if (!lead.name?.trim()) {
    return { isValid: false, message: "Nome é obrigatório" };
  }
  
  if (!lead.email?.trim()) {
    return { isValid: false, message: "Email é obrigatório" };
  }
  
  const emailValidation = validateEmail(lead.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }
  
  if (!lead.company?.trim()) {
    return { isValid: false, message: "Empresa é obrigatória" };
  }
  
  return { isValid: true };
};

/**
 * Debounce function para otimizar performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};