"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Mail, Building, BarChart2, Sparkles, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PredictiveQualityChart } from "@/components/predictive-quality-chart"
import type { Lead } from "@/lib/api"

interface LeadDetailSheetProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConvert: (lead: Lead) => void
  onSave: (lead: Lead) => void
  onDelete: (lead: Lead) => void
}

const statusColors = {
  New: "bg-purple-100 text-purple-800 border-purple-200",
  Contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Qualified: "bg-green-100 text-green-800 border-green-200",
}

export function LeadDetailSheet({ lead, open, onOpenChange, onConvert, onSave, onDelete }: LeadDetailSheetProps) {
  const { t } = useTranslation()
  const [editedLead, setEditedLead] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)
  const [converting, setConverting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Update edited lead when lead prop changes
  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead })
      setError(null)
      setSuccess(null)
    }
  }, [lead])

  if (!lead || !editedLead) return null

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSave = async () => {
    if (!validateEmail(editedLead.email)) {
      setError("Please enter a valid email address")
      return
    }

    setSaving(true)
    setError(null)

    try {
      await onSave(editedLead)
      setSuccess("Lead updated successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      setError("Failed to save lead changes")
    } finally {
      setSaving(false)
    }
  }

  const handleConvert = async () => {
    setConverting(true)
    try {
      await onConvert(editedLead)
    } catch (error) {
      setError("Failed to convert lead")
    } finally {
      setConverting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    try {
      await onDelete(editedLead)
    } catch (error) {
      setError("Failed to delete lead")
    } finally {
      setDeleting(false)
    }
  }

  const handleCancel = () => {
    setEditedLead({ ...lead })
    setError(null)
    setSuccess(null)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md glass-effect border-l border-gray-200">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl font-bold text-gray-900">{t("detail_sheet.title")}</SheetTitle>
          <SheetDescription className="text-gray-600">View and edit lead information</SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{lead.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{lead.name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {lead.company}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  {t("detail_sheet.fields.name")}
                </Label>
                <Input
                  id="name"
                  value={editedLead.name}
                  onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                  className="bg-white border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  {t("detail_sheet.fields.company")}
                </Label>
                <Input
                  id="company"
                  value={editedLead.company}
                  onChange={(e) => setEditedLead({ ...editedLead, company: e.target.value })}
                  className="bg-white border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {t("detail_sheet.fields.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editedLead.email}
                  onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                  className={`bg-white border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                    error && !validateEmail(editedLead.email)
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  {t("detail_sheet.fields.status")}
                </Label>
                <Select
                  value={editedLead.status}
                  onValueChange={(value: Lead["status"]) => setEditedLead({ ...editedLead, status: value })}
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-purple-500 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="New">{t("leads.status.new")}</SelectItem>
                    <SelectItem value="Contacted">{t("leads.status.contacted")}</SelectItem>
                    <SelectItem value="Qualified">{t("leads.status.qualified")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">{t("detail_sheet.fields.source")}</Label>
                <p className="text-gray-900 font-medium">{lead.source}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <BarChart2 className="h-3 w-3" />
                  {t("detail_sheet.fields.score")}
                </Label>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        lead.score >= 90
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : lead.score >= 70
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                            : "bg-gradient-to-r from-red-500 to-red-400"
                      }`}
                      style={{ width: `${Math.max(lead.score, 10)}%` }}
                    />
                  </div>
                  <span className="text-gray-900 font-semibold">{lead.score}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-500">Current Status</Label>
              <Badge className={`${statusColors[editedLead.status]} rounded-full px-3 py-1 text-xs font-medium border`}>
                {t(`leads.status.${editedLead.status.toLowerCase()}`)}
              </Badge>
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Predictive Quality Score</Label>
              <div className="flex items-center justify-center">
                <PredictiveQualityChart quality={lead.predictiveQuality || 0} />
              </div>
              <p className="text-xs text-gray-500 text-center">Based on lead score and source quality indicators</p>
            </div>
          </div>
        </div>

        <SheetFooter className="gap-2 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={deleting}
            className="border-red-200 hover:bg-red-50 bg-transparent text-red-600 hover:text-red-700 btn-press transition-all duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-200 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 btn-press transition-all duration-200"
          >
            {t("detail_sheet.buttons.close")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="secondary"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 btn-press transition-all duration-200"
          >
            {saving ? "Saving..." : t("detail_sheet.buttons.save_changes")}
          </Button>
          <Button
            onClick={handleConvert}
            disabled={converting}
            className="bg-purple-500 hover:bg-purple-600 text-white btn-press hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {converting ? "Converting..." : t("detail_sheet.buttons.convert")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
