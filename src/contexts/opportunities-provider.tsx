import type { Opportunity } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface OpportunitiesContextType {
  opportunities: Opportunity[];
  loading: boolean;
  addOpportunity: (_opportunity: Omit<Opportunity, "id">) => void;
  updateOpportunity: (_id: number, _opportunity: Partial<Opportunity>) => void;
  deleteOpportunity: (_id: number) => void;
  clearOpportunities: () => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

const STORAGE_KEY = "mini-seller-opportunities";

/**
 * Generates a unique ID
 */
const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Local storage functions
 */
const saveOpportunitiesToStorage = (opportunities: Opportunity[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  } catch (error) {
    console.error("Erro ao salvar oportunidades no localStorage:", error);
  }
};

const loadOpportunitiesFromStorage = (): Opportunity[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao carregar oportunidades do localStorage:", error);
  }
  return [];
};

interface OpportunitiesProviderProps {
  children: ReactNode;
}

export function OpportunitiesProvider({ children }: OpportunitiesProviderProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeOpportunities = async () => {
      setLoading(true);
      const storedOpportunities = loadOpportunitiesFromStorage();
      setOpportunities(storedOpportunities);
      setIsInitialized(true);
      setLoading(false);
    };

    initializeOpportunities();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveOpportunitiesToStorage(opportunities);
    }
  }, [opportunities, isInitialized]);

  const addOpportunity = (opportunityData: Omit<Opportunity, "id">) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: generateId(),
    };
    setOpportunities(prev => [...prev, newOpportunity]);
  };

  const updateOpportunity = (id: number, opportunityData: Partial<Opportunity>) => {
    setOpportunities(prev =>
      prev.map(_opportunity =>
        _opportunity.id === id ? { ..._opportunity, ...opportunityData } : _opportunity,
      ),
    );
  };

  const deleteOpportunity = (id: number) => {
    setOpportunities(prev => prev.filter(_opportunity => _opportunity.id !== id));
  };

  const clearOpportunities = () => {
    setOpportunities([]);
  };

  const value: OpportunitiesContextType = {
    opportunities,
    loading,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    clearOpportunities,
  };

  return <OpportunitiesContext.Provider value={value}>{children}</OpportunitiesContext.Provider>;
}

function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  if (context === undefined) {
    throw new Error("useOpportunities deve ser usado dentro de um OpportunitiesProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { OpportunitiesContext, useOpportunities };
