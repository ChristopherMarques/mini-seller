import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Edit, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "./utils";

interface EditableAmountCellProps {
  value: number;
  onSave: (_newValue: number) => void;
}

export function EditableAmountCell({ value, onSave }: EditableAmountCellProps) {
  const { i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [error, setError] = useState("");

  const currentLanguage = i18n.language || "pt";
  const isPortuguese = currentLanguage === "pt";

  useEffect(() => {
    setEditValue(value.toString());
  }, [value]);

  const handleSave = () => {
    const cleanValue = editValue.replace(/[^\d.,]/g, "").replace(",", ".");
    const numericValue = parseFloat(cleanValue);

    if (isNaN(numericValue) || numericValue < 0) {
      setError("Valor deve ser um número positivo");
      return;
    }

    if (numericValue > 999999999) {
      setError("Valor muito alto");
      return;
    }

    setError("");
    onSave(numericValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value.toString());
    setError("");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            value={editValue}
            onChange={e => {
              const allowedChars = isPortuguese ? /[^\d.,R$\s]/g : /[^\d.,$\s]/g;
              const value = e.target.value.replace(allowedChars, "");
              setEditValue(value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
            className={`text-right ${error ? "border-red-500" : ""}`}
            placeholder={isPortuguese ? "R$ 0,00" : "$ 0.00"}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={handleSave} className="h-8 w-8 p-0">
            <Check className="h-4 w-4 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0">
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2 group">
      <span className="font-medium">{formatCurrency(value)}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
}
