import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { ManualImportTabProps } from "./types";
import { getStatusOptions } from "./utils";

export function ManualImportTab({
  manualLead,
  setManualLead,
  error,
  success,
  loading,
  onAdd,
  onCancel,
}: ManualImportTabProps) {
  const { t } = useTranslation();
  const statusOptions = getStatusOptions(t);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="manual-name">{t("leads.import.manual_name")}</Label>
          <Input
            id="manual-name"
            className="border-gray-200 shadow-sm"
            value={manualLead.name}
            onChange={e => setManualLead(prev => ({ ...prev, name: e.target.value }))}
            placeholder={t("leads.import.placeholder_name")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-company">{t("leads.import.manual_company")}</Label>
          <Input
            id="manual-company"
            className="border-gray-200 shadow-sm"
            value={manualLead.company}
            onChange={e => setManualLead(prev => ({ ...prev, company: e.target.value }))}
            placeholder={t("leads.import.placeholder_company")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-email">{t("leads.import.manual_email")}</Label>
          <Input
            id="manual-email"
            className="border-gray-200 shadow-sm"
            type="email"
            value={manualLead.email}
            onChange={e => setManualLead(prev => ({ ...prev, email: e.target.value }))}
            placeholder={t("leads.import.placeholder_email")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-source">{t("leads.import.manual_source")}</Label>
          <Input
            id="manual-source"
            className="border-gray-200 shadow-sm"
            value={manualLead.source}
            onChange={e => setManualLead(prev => ({ ...prev, source: e.target.value }))}
            placeholder={t("leads.import.placeholder_source")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-score">{t("leads.import.manual_score")}</Label>
          <Input
            id="manual-score"
            className="border-gray-200 shadow-sm"
            type="number"
            min="0"
            max="100"
            value={manualLead.score}
            onChange={e =>
              setManualLead(prev => ({ ...prev, score: parseInt(e.target.value) || 0 }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-status">{t("leads.import.manual_status")}</Label>
          <Select
            value={manualLead.status}
            onValueChange={(value: "New" | "Contacted" | "Qualified") =>
              setManualLead(prev => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className="border-gray-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-sm">
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</div>
      )}

      <DialogFooter>
        <Button
          variant="secondary"
          className="bg-white border-gray-200 shadow-sm"
          onClick={onCancel}
        >
          {t("leads.import.button_cancel")}
        </Button>
        <Button
          variant="default"
          onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? t("leads.import.adding") : t("leads.import.button_add")}
        </Button>
      </DialogFooter>
    </>
  );
}
