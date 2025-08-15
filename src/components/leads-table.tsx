"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Users, Mail, Building, BarChart3 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Lead } from "@/types"

interface LeadsTableProps {
  leads: Lead[]
  loading: boolean
  onLeadClick: (lead: Lead) => void
}

const statusColors = {
  New: "bg-purple-100 text-purple-800 border-purple-200",
  Contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Qualified: "bg-green-100 text-green-800 border-green-200",
}

function ScoreIndicator({ score }: { score: number }) {
  const getScoreClass = (score: number) => {
    if (score >= 90) return "score-high"
    if (score >= 70) return "score-medium"
    return "score-low"
  }

  const width = Math.max(score, 10) // Minimum 10% width for visibility

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-gray-200 rounded-full h-1.5">
        <div className={`score-bar ${getScoreClass(score)}`} style={{ width: `${width}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-900">{score}</span>
    </div>
  )
}

export function LeadsTable({ leads, loading, onLeadClick }: LeadsTableProps) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedLeads = [...filteredLeads].sort((a, b) => b.score - a.score)

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold gradient-text">{t("leads.title")}</h2>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1 bg-gray-200" />
            <Skeleton className="h-12 w-40 bg-gray-200" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">{t("leads.title")}</h2>
          <p className="text-gray-600 mt-2">{t("leads.subtitle")}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("leads.search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-12 bg-white border-gray-200 hover:bg-gray-50 focus:border-purple-500 transition-all duration-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">{t("leads.filter_all_status")}</SelectItem>
            <SelectItem value="New">{t("leads.status.new")}</SelectItem>
            <SelectItem value="Contacted">{t("leads.status.contacted")}</SelectItem>
            <SelectItem value="Qualified">{t("leads.status.qualified")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedLeads.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No leads found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No leads available at the moment."}
          </p>
        </div>
      ) : (
        <div className="hidden md:block">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent bg-gray-50/50">
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.name")}</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.company")}</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.email")}</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.source")}</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.score")}</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">{t("leads.table_header.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead, index) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer border-b border-gray-100 hover:bg-purple-50 transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => onLeadClick(lead)}
                  >
                    <TableCell className="font-medium text-gray-900 py-4">{lead.name}</TableCell>
                    <TableCell className="text-gray-600 py-4">{lead.company}</TableCell>
                    <TableCell className="text-gray-600 py-4">{lead.email}</TableCell>
                    <TableCell className="text-gray-600 py-4">{lead.source}</TableCell>
                    <TableCell className="py-4">
                      <ScoreIndicator score={lead.score} />
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`${statusColors[lead.status]} rounded-full px-3 py-1 text-xs font-medium border`}
                      >
                        {t(`leads.status.${lead.status.toLowerCase()}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="md:hidden space-y-4">
        {sortedLeads.map((lead, index) => (
          <div
            key={lead.id}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover-lift transition-all duration-200 shadow-sm animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onLeadClick(lead)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {lead.company}
                </p>
              </div>
              <Badge className={`${statusColors[lead.status]} rounded-full px-3 py-1 text-xs font-medium border`}>
                {t(`leads.status.${lead.status.toLowerCase()}`)}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {lead.email}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Source: {lead.source}</span>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-gray-400" />
                  <ScoreIndicator score={lead.score} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
