"use client"

import { useState, useEffect, Suspense } from "react"
import { LeadsTable } from "@/components/leads-table"
import { LeadDetailSheet } from "@/components/lead-detail-sheet"
import LanguageSwitcher from "@/components/language-switcher"
import { KpiCards } from "@/components/kpi-cards"
import { AnalyticsSection } from "@/components/analytics-section"
import { useTranslation } from "react-i18next"
import { api, type Lead, type Opportunity, type KPIData } from "@/lib/api"

function MiniSellerConsoleContent() {
  const { t } = useTranslation()
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Load all data in parallel
        const [leadsData, opportunitiesData, kpiData] = await Promise.all([
          api.getLeads(),
          api.getOpportunities(),
          api.getKPIs(),
        ])

        setLeads(leadsData)
        setOpportunities(opportunitiesData)
        setKpiData(kpiData)
      } catch (error) {
        console.error("Failed to load data:", error)
        setError("Failed to load data. Please make sure the backend server is running.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setSheetOpen(true)
  }

  const handleSaveLead = async (updatedLead: Lead) => {
    try {
      const savedLead = await api.updateLead(updatedLead.id, updatedLead)
      setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === savedLead.id ? savedLead : lead)))
      setSelectedLead(savedLead)

      // Refresh KPIs after update
      const newKpiData = await api.getKPIs()
      setKpiData(newKpiData)
    } catch (error) {
      console.error("Failed to save lead:", error)
      setError("Failed to save lead changes")
    }
  }

  const handleConvertLead = async (lead: Lead) => {
    try {
      const result = await api.convertLead(lead.id)

      // Remove lead from leads list
      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id))

      // Add to opportunities
      setOpportunities((prevOpportunities) => [...prevOpportunities, result.opportunity])

      // Refresh KPIs after conversion
      const newKpiData = await api.getKPIs()
      setKpiData(newKpiData)

      // Close the sheet
      setSheetOpen(false)
    } catch (error) {
      console.error("Failed to convert lead:", error)
      setError("Failed to convert lead")
    }
  }

  const handleDeleteLead = async (lead: Lead) => {
    try {
      await api.deleteLead(lead.id)

      // Remove lead from leads list
      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id))

      // Refresh KPIs after deletion
      const newKpiData = await api.getKPIs()
      setKpiData(newKpiData)

      // Close the sheet
      setSheetOpen(false)
    } catch (error) {
      console.error("Failed to delete lead:", error)
      setError("Failed to delete lead")
    }
  }

  const handleCreateLead = async (leadData: Omit<Lead, "id" | "createdAt">) => {
    try {
      const newLead = await api.createLead(leadData)
      setLeads((prevLeads) => [newLead, ...prevLeads])

      // Refresh KPIs after creation
      const newKpiData = await api.getKPIs()
      setKpiData(newKpiData)
    } catch (error) {
      console.error("Failed to create lead:", error)
      setError("Failed to create new lead")
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-medium">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="gradient-blob gradient-blob-1"></div>
      <div className="gradient-blob gradient-blob-2"></div>
      <div className="gradient-blob gradient-blob-3"></div>

      <div className="relative z-10 container mx-auto py-8 px-4 space-y-8">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">{t("header.title")}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("header.subtitle")}</p>
        </div>

        <KpiCards kpiData={kpiData} loading={loading} />

        <AnalyticsSection leads={leads} loading={loading} />

        <LeadsTable leads={leads} loading={loading} onLeadClick={handleLeadClick} onCreateLead={handleCreateLead} />

        <LeadDetailSheet
          lead={selectedLead}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onConvert={handleConvertLead}
          onSave={handleSaveLead}
          onDelete={handleDeleteLead}
        />
      </div>
    </div>
  )
}

export default function MiniSellerConsole() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <MiniSellerConsoleContent />
    </Suspense>
  )
}
