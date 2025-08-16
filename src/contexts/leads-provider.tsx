import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lead } from '@/types'

interface LeadsContextType {
  leads: Lead[]
  loading: boolean
  addLead: (lead: Omit<Lead, 'id'>) => void
  updateLead: (id: number, lead: Partial<Lead>) => void
  deleteLead: (id: number) => void
  importLeads: (leads: Lead[]) => void
  clearLeads: () => void
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined)

const STORAGE_KEY = 'mini-seller-leads'

// Função para gerar ID único
const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000)
}

// Funções de localStorage
const saveLeadsToStorage = (leads: Lead[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  } catch (error) {
    console.error('Erro ao salvar leads no localStorage:', error)
  }
}

const loadLeadsFromStorage = (): Lead[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erro ao carregar leads do localStorage:', error)
  }
  return []
}

// Função para carregar leads iniciais do arquivo JSON (fallback)
const loadInitialLeads = async (): Promise<Lead[]> => {
  try {
    const response = await fetch('/data/leads.json')
    if (response.ok) {
      const data = await response.json()
      return data.leads || []
    }
  } catch (error) {
    console.error('Erro ao carregar leads iniciais:', error)
  }
  return []
}

interface LeadsProviderProps {
  children: ReactNode
}

export function LeadsProvider({ children }: LeadsProviderProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Carregar leads na inicialização
  useEffect(() => {
    const initializeLeads = async () => {
      setLoading(true)
      const storedLeads = loadLeadsFromStorage()
      
      if (storedLeads.length > 0) {
        setLeads(storedLeads)
      } else {
        // Se não há leads no localStorage, carregar do arquivo JSON
        const initialLeads = await loadInitialLeads()
        setLeads(initialLeads)
        if (initialLeads.length > 0) {
          saveLeadsToStorage(initialLeads)
        }
      }
      
      setIsInitialized(true)
      setLoading(false)
    }

    initializeLeads()
  }, [])

  // Salvar no localStorage sempre que leads mudarem
  useEffect(() => {
    if (isInitialized) {
      saveLeadsToStorage(leads)
    }
  }, [leads, isInitialized])

  const addLead = (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadData,
      id: generateId()
    }
    setLeads(prev => [...prev, newLead])
  }

  const updateLead = (id: number, leadData: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...leadData } : lead
    ))
  }

  const deleteLead = (id: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== id))
  }

  const importLeads = (newLeads: Lead[]) => {
    // Adicionar IDs se não existirem
    const leadsWithIds = newLeads.map(lead => ({
      ...lead,
      id: typeof lead.id === 'number' ? lead.id : generateId()
    }))
    
    // Substituir todos os leads pelos importados
    setLeads(leadsWithIds)
  }

  const clearLeads = () => {
    setLeads([])
  }

  const value: LeadsContextType = {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    importLeads,
    clearLeads
  }

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  )
}

export function useLeads() {
  const context = useContext(LeadsContext)
  if (context === undefined) {
    throw new Error('useLeads deve ser usado dentro de um LeadsProvider')
  }
  return context
}

export { LeadsContext }