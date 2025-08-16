import { LanguageSwitcher } from "@/components/language-switcher";
import { LeadDetailSheet } from "@/components/lead-detail-sheet";
import { LeadsTable } from "@/components/leads-table";
import { OpportunitiesTable } from "@/components/opportunities-table";
import { Footer } from "@/components/shared/footer";
import { Tutorial } from "@/components/shared/tutorial";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LeadsProvider, useLeads } from "@/contexts/leads-provider";
import type { Lead, Opportunity } from "@/types";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/theme-provider";

function MiniSellerConsoleContent() {
  const { t } = useTranslation();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setSheetOpen(true);
  };

  const { updateLead, deleteLead } = useLeads();

  const handleSaveLead = (updatedLead: Lead) => {
    updateLead(updatedLead.id, updatedLead);
    setSelectedLead(updatedLead);
  };

  const handleConvertLead = (lead: Lead) => {
    deleteLead(lead.id);

    const newOpportunity: Opportunity = {
      id: Date.now(),
      name: lead.name,
      stage: "Discovery",
      accountName: lead.company,
      amount: 0,
    };

    setOpportunities(prevOpportunities => [...prevOpportunities, newOpportunity]);
  };

  const handleDeleteLead = (lead: Lead) => {
    deleteLead(lead.id);
    setSheetOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="gradient-blob gradient-blob-1"></div>
      <div className="gradient-blob gradient-blob-2"></div>
      <div className="gradient-blob gradient-blob-3"></div>

      <div className="relative z-10 container mx-auto py-8 px-4 space-y-8">
        <div className="flex justify-end items-center gap-3 mb-4" data-tutorial="controls">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Tutorial />
        </div>

        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">{t("header.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("header.subtitle")}</p>
        </div>

        <div data-tutorial="opportunities">
          <OpportunitiesTable opportunities={opportunities} />
        </div>

        <div data-tutorial="leads">
          <LeadsTable onLeadClick={handleLeadClick} />
        </div>

        <LeadDetailSheet
          lead={selectedLead}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onConvert={handleConvertLead}
          onSave={handleSaveLead}
          onDelete={handleDeleteLead}
        />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mini-seller-theme">
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
            Loading...
          </div>
        }
      >
        <LeadsProvider>
          <MiniSellerConsoleContent />
        </LeadsProvider>
      </Suspense>
    </ThemeProvider>
  );
}
