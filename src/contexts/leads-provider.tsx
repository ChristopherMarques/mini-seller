import type { Lead } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  addLead: (_lead: Omit<Lead, "id">) => void;
  updateLead: (_id: number, _lead: Partial<Lead>) => void;
  deleteLead: (_id: number) => void;
  importLeads: (_leads: Lead[]) => void;
  clearLeads: () => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

const STORAGE_KEY = "mini-seller-leads";

/**
 * Generates a unique ID
 */
const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Local storage functions
 */
const saveLeadsToStorage = (leads: Lead[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error("Erro ao salvar leads no localStorage:", error);
  }
};

const loadLeadsFromStorage = (): Lead[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao carregar leads do localStorage:", error);
  }
  return [];
};

/**
 * Loads initial leads from JSON file (fallback)
 */
const loadInitialLeads = async (): Promise<Lead[]> => {
  try {
    const response = await fetch("/data/leads.json");
    if (response.ok) {
      const data = await response.json();
      return data.leads || [];
    }
  } catch (error) {
    console.error("Erro ao carregar leads iniciais:", error);
  }
  return [];
};

interface LeadsProviderProps {
  children: ReactNode;
}

export function LeadsProvider({ children }: LeadsProviderProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeLeads = async () => {
      setLoading(true);
      const storedLeads = loadLeadsFromStorage();

      if (storedLeads.length > 0) {
        setLeads(storedLeads);
      } else {
        const initialLeads = await loadInitialLeads();
        setLeads(initialLeads);
        if (initialLeads.length > 0) {
          saveLeadsToStorage(initialLeads);
        }
      }

      setIsInitialized(true);
      setLoading(false);
    };

    initializeLeads();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveLeadsToStorage(leads);
    }
  }, [leads, isInitialized]);

  const addLead = (leadData: Omit<Lead, "id">) => {
    const newLead: Lead = {
      ...leadData,
      id: generateId(),
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (id: number, leadData: Partial<Lead>) => {
    setLeads(prev => prev.map(_lead => (_lead.id === id ? { ..._lead, ...leadData } : _lead)));
  };

  const deleteLead = (id: number) => {
    setLeads(prev => prev.filter(_lead => _lead.id !== id));
  };

  const importLeads = (newLeads: Lead[]) => {
    // Add IDs if they don't exist
    const _leadsWithIds = newLeads.map(_lead => ({
      ..._lead,
      id: typeof _lead.id === "number" ? _lead.id : generateId(),
    }));

    setLeads(_leadsWithIds);
  };

  const clearLeads = () => {
    setLeads([]);
  };

  const value: LeadsContextType = {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    importLeads,
    clearLeads,
  };

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error("useLeads deve ser usado dentro de um LeadsProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { LeadsContext, useLeads };
