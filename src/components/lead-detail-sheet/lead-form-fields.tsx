import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateEmail } from "@/components/shared";
import { getInputErrorClasses, getStatusOptions } from "./utils";
import type { LeadFormFieldsProps, Lead } from "./types";

export function LeadFormFields({ editedLead, onLeadChange, hasError, t }: LeadFormFieldsProps) {
  const statusOptions = getStatusOptions(t);
  const emailHasError = hasError && !validateEmail(editedLead.email).isValid;
  const inputClasses = getInputErrorClasses(emailHasError);

  const handleEmailChange = (email: string) => {
    onLeadChange({ ...editedLead, email });
  };

  const handleStatusChange = (status: Lead["status"]) => {
    onLeadChange({ ...editedLead, status });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <Mail className="h-4 w-4 text-gray-400" />
          {t("detail_sheet.fields.email")}
        </Label>
        <Input
          id="email"
          type="email"
          value={editedLead.email}
          onChange={e => handleEmailChange(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status" className="text-sm font-medium text-gray-700">
          {t("detail_sheet.fields.status")}
        </Label>
        <Select value={editedLead.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="bg-white border-gray-200 focus:border-purple-500 transition-all duration-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
