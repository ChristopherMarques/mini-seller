// Constantes compartilhadas entre componentes

// Cores de status para leads
export const STATUS_COLORS = {
  New: "bg-purple-100 text-purple-800 border-purple-200",
  Contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Qualified: "bg-green-100 text-green-800 border-green-200",
} as const;

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
] as const;

export const SCORE_CONFIG = {
  HIGH_THRESHOLD: 90,
  MEDIUM_THRESHOLD: 70,
  MIN_WIDTH: 10,
} as const;

// Classes CSS para scores
export const SCORE_CLASSES = {
  HIGH: "score-high",
  MEDIUM: "score-medium",
  LOW: "score-low",
} as const;

export const DEFAULT_VALUES = {
  CONVERSION_RATE: 85,
  AVERAGE_SCORE: 87,
  DEFAULT_SCORE: 50,
} as const;
