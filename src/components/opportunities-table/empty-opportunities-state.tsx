import { LeadImportDialog } from "@/components/lead-import-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EmptyOpportunitiesStateProps } from "./types";
import { getEmptyStateClasses } from "./utils";

export function EmptyOpportunitiesState({ onImportClick }: EmptyOpportunitiesStateProps) {
  const { t } = useTranslation();
  const classes = getEmptyStateClasses();

  return (
    <Card className="shadow-sm border-primary/50">
      <CardContent className="py-16">
        <div className={classes.container}>
          <div className={classes.icon}>
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className={classes.title}>{t("opportunities.empty.title")}</h3>
          <p className={classes.subtitle}>{t("opportunities.empty.subtitle")}</p>
          <LeadImportDialog>
            <Button className={classes.button} onClick={onImportClick}>
              <Plus className="h-4 w-4" />
              {t("leads.import_button")}
            </Button>
          </LeadImportDialog>
        </div>
      </CardContent>
    </Card>
  );
}
