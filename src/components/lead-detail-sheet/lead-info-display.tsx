import { BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { STATUS_COLORS } from "@/components/shared";
import { getScoreGradientClass, getScoreBarWidth } from "./utils";
import type { LeadInfoDisplayProps } from "./types";

export function LeadInfoDisplay({ lead, t }: LeadInfoDisplayProps) {
  const scoreGradientClass = getScoreGradientClass(lead.score);
  const scoreBarWidth = getScoreBarWidth(lead.score);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-500">
            {t("detail_sheet.fields.source")}
          </Label>
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
                className={`h-2 rounded-full ${scoreGradientClass}`}
                style={{ width: `${scoreBarWidth}%` }}
              />
            </div>
            <span className="text-gray-900 font-semibold">{lead.score}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 space-x-2">
        <Label className="text-sm font-medium text-gray-500">
          {t("detail_sheet.current_status")}
        </Label>
        <Badge className={`${STATUS_COLORS[lead.status]} rounded-full px-3 py-1 text-xs font-medium border`}>
          {t(`leads.status.${lead.status.toLowerCase()}`)}
        </Badge>
      </div>
    </>
  );
}