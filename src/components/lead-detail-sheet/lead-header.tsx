import { Building } from "lucide-react";
import { getInitials } from "./utils";
import type { LeadHeaderProps } from "./types";

export function LeadHeader({ lead }: LeadHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-lg">{getInitials(lead.name)}</span>
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">{lead.name}</p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Building className="h-3 w-3" />
          {lead.company}
        </p>
      </div>
    </div>
  );
}
