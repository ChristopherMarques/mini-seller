"use client"

import { useState, useEffect, Suspense } from "react"
import { OpportunitiesTable } from "@/components/opportunities-table"
import { LeadsTable } from "@/components/leads-table"
import { LeadDetailSheet } from "@/components/lead-detail-sheet"
import LanguageSwitcher from "@/components/language-switcher"
import { useTranslation } from "react-i18next"
import type { Lead, Opportunity } from "@/types"

function MiniSellerConsoleContent() {
  const { t } = useTranslation()
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      // Simulate API call with timeout
      setTimeout(async () => {
        try {
          const response = await fetch("/data/leads.json")
          const leadsData = await response.json()
          setLeads(leadsData)
        } catch (error) {
          console.error("Failed to load leads:", error)
        } finally {
          setLoading(false)
        }
      }, 1500) // Simulate network delay
    }

    loadData()
  }, [])

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setSheetOpen(true)
  }

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)))
    setSelectedLead(updatedLead)
  }

  const handleConvertLead = (lead: Lead) => {
    // Remove lead from leads list
    setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id))

    // Add to opportunities
    const newOpportunity: Opportunity = {
      id: Date.now(), // Simple ID generation
      name: lead.name,
      stage: "Discovery",
      accountName: lead.company,
    }

    setOpportunities((prevOpportunities) => [...prevOpportunities, newOpportunity])
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

        <OpportunitiesTable opportunities={opportunities} />

        <LeadsTable leads={leads} loading={loading} onLeadClick={handleLeadClick} />

        <LeadDetailSheet
          lead={selectedLead}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onConvert={handleConvertLead}
          onSave={handleSaveLead}
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
