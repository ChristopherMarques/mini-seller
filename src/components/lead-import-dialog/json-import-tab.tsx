import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { JsonImportTabProps } from "./types";
import { getJsonPlaceholder } from "./utils";

export function JsonImportTab({
  jsonInput,
  setJsonInput,
  error,
  success,
  loading,
  onImport,
  onCancel,
}: JsonImportTabProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="json-input">JSON</Label>
        <Textarea
          id="json-input"
          placeholder={getJsonPlaceholder()}
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          className="min-h-[200px] bg-white border-gray-200 shadow-sm font-mono text-sm"
        />
        <p className="text-sm text-muted-foreground">{t("leads.import.json_help")}</p>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</div>
      )}

      <DialogFooter>
        <Button variant="secondary" className="border-gray-200 shadow-sm" onClick={onCancel}>
          {t("leads.import.button_cancel")}
        </Button>
        <Button
          variant="default"
          onClick={onImport}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={loading || !jsonInput.trim()}
        >
          {loading ? t("leads.import.importing") : t("leads.import.button_import")}
        </Button>
      </DialogFooter>
    </>
  );
}
