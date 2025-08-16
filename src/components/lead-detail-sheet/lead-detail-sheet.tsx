import { Alert, AlertDescription } from "@/components/ui/alert";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeadFormFields } from "./lead-form-fields";
import { LeadHeader } from "./lead-header";
import { LeadInfoDisplay } from "./lead-info-display";
import { SheetActions } from "./sheet-actions";
import type { Lead, LeadDetailSheetProps } from "./types";
import { simulateConvertApi, simulateSaveApi, validateLeadForm } from "./utils";

export function LeadDetailSheet({
  lead,
  open,
  onOpenChange,
  onConvert,
  onSave,
  onDelete,
}: LeadDetailSheetProps) {
  const { t } = useTranslation();
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
      setError(null);
      setSuccess(null);
    }
  }, [lead]);

  if (!lead || !editedLead) return null;

  const handleSave = async () => {
    const validation = validateLeadForm(editedLead, t);

    if (!validation.isValid) {
      setError(validation.message || "");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await simulateSaveApi(editedLead);
      onSave(editedLead);
      setSaving(false);
      setSuccess(t("detail_sheet.messages.lead_updated"));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setSaving(false);
      setError(t("detail_sheet.messages.save_error"));
    }
  };

  const handleConvert = async () => {
    setConverting(true);

    try {
      await simulateConvertApi();
      onConvert(editedLead);
      setConverting(false);
      onOpenChange(false);
    } catch (err) {
      setConverting(false);
      setError(t("detail_sheet.messages.convert_error"));
    }
  };

  const handleCancel = () => {
    setEditedLead({ ...lead });
    setError(null);
    setSuccess(null);
    onOpenChange(false);
  };

  const handleLeadChange = (updatedLead: Lead) => {
    setEditedLead(updatedLead);
    setError(null);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!onDelete || !editedLead) return;

    setDeleting(true);
    setError(null);

    try {
      onDelete(editedLead);
      setDeleting(false);
      onOpenChange(false);
    } catch (err) {
      setDeleting(false);
      setError(t("detail_sheet.messages.delete_error", "Erro ao excluir lead"));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full sm:max-w-md glass-effect border-l border-gray-200"
        side="right"
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl font-bold text-gray-900">
            {t("detail_sheet.title")}
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            {t("detail_sheet.description")}
          </SheetDescription>
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
              <LeadHeader lead={lead} />
            </div>

            <Separator className="bg-gray-200" />

            <LeadFormFields
              editedLead={editedLead}
              onLeadChange={handleLeadChange}
              hasError={!!error}
              t={t}
            />

            <Separator className="bg-gray-200" />

            <LeadInfoDisplay lead={lead} t={t} />
          </div>
        </div>

        <SheetActions
          onSave={handleSave}
          onConvert={handleConvert}
          onCancel={handleCancel}
          onDelete={onDelete ? handleDelete : undefined}
          saving={saving}
          converting={converting}
          deleting={deleting}
          t={t}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          itemName={editedLead?.name || ""}
        />
      </SheetContent>
    </Sheet>
  );
}
