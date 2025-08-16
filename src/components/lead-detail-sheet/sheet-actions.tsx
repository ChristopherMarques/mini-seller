import { Button } from "@/components/ui/button";
import { Sparkles, Trash2 } from "lucide-react";
import type { SheetActionsProps } from "./types";

export function SheetActions({
  onSave,
  onConvert,
  onDelete,
  saving,
  converting,
  deleting,
  t,
}: SheetActionsProps) {
  return (
    <div className="pt-6 border-t border-primary/50">
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onConvert}
          disabled={converting}
          className="flex-1 btn-press transition-all duration-200"
          variant="default"
          data-tutorial="conversion"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {converting ? t("detail_sheet.messages.converting") : t("detail_sheet.buttons.convert")}
        </Button>
        <div className="flex flex-col sm:flex-row gap-2">
          {onDelete && (
            <Button
              onClick={onDelete}
              disabled={deleting}
              variant="destructive"
              className="btn-press transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {deleting ? t("detail_sheet.messages.deleting") : t("common.delete")}
            </Button>
          )}
          <Button
            onClick={onSave}
            disabled={saving}
            variant="secondary"
            className="flex-1 btn-press transition-all duration-200"
          >
            {saving ? t("detail_sheet.messages.saving") : t("detail_sheet.buttons.save_changes")}
          </Button>
        </div>
      </div>
    </div>
  );
}
