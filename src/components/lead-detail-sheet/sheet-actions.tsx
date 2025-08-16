import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
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
    <SheetFooter className="gap-2 pt-6 border-t border-gray-200">
      <div className="flex gap-2 w-full">
        <div className="flex gap-2 flex-1">
          <Button
            onClick={onSave}
            disabled={saving}
            variant="secondary"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 btn-press transition-all duration-200"
          >
            {saving ? t("detail_sheet.messages.saving") : t("detail_sheet.buttons.save_changes")}
          </Button>
          <Button
            onClick={onConvert}
            disabled={converting}
            className="bg-purple-500 hover:bg-purple-600 text-white btn-press hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {converting ? t("detail_sheet.messages.converting") : t("detail_sheet.buttons.convert")}
          </Button>
        </div>
        {onDelete && (
          <Button
            onClick={onDelete}
            disabled={deleting}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white btn-press transition-all duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {deleting ? t("detail_sheet.messages.deleting") : t("common.delete")}
          </Button>
        )}
      </div>
    </SheetFooter>
  );
}
