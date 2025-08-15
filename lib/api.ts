const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface Lead {
  id: number
  name: string
  company: string
  email: string
  source: string
  score: number
  status: string
  createdAt: string
  predictiveQuality: number
}

export interface Opportunity {
  id: number
  name: string
  accountName: string
  stage: string
  amount?: number
  createdAt: string
}

export interface KPIData {
  opportunitiesCount: number
  leadsCount: number
  averageScore: number
  conversionRate: number
  averagePredictiveQuality: number
}

// API service functions
export const api = {
  // Leads
  async getLeads(params?: { search?: string; status?: string; sortBy?: string; sortOrder?: string }): Promise<Lead[]> {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.append("search", params.search)
    if (params?.status) searchParams.append("status", params.status)
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy)
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder)

    const response = await fetch(`${API_BASE_URL}/leads?${searchParams}`)
    if (!response.ok) throw new Error("Failed to fetch leads")
    return response.json()
  },

  async createLead(leadData: Omit<Lead, "id" | "createdAt" | "predictiveQuality">): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    })
    if (!response.ok) throw new Error("Failed to create lead")
    return response.json()
  },

  async updateLead(id: number, leadData: Partial<Lead>): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    })
    if (!response.ok) throw new Error("Failed to update lead")
    return response.json()
  },

  async deleteLead(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete lead")
  },

  async convertLead(id: number): Promise<{ opportunity: Opportunity; message: string }> {
    const response = await fetch(`${API_BASE_URL}/leads/${id}/convert`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to convert lead")
    return response.json()
  },

  // Opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    const response = await fetch(`${API_BASE_URL}/opportunities`)
    if (!response.ok) throw new Error("Failed to fetch opportunities")
    return response.json()
  },

  // KPIs
  async getKPIs(): Promise<KPIData> {
    const response = await fetch(`${API_BASE_URL}/kpis`)
    if (!response.ok) throw new Error("Failed to fetch KPIs")
    return response.json()
  },
}
