import { Lead } from '@/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLeads } from '@/contexts/leads-provider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JsonImportTab } from './json-import-tab';
import { ManualImportTab } from './manual-import-tab';
import { LeadImportDialogProps } from './types';
import {
  getImportSuccessMessage,
  getInitialManualLead,
  processJsonImport,
  validateManualLead
} from './utils';

export function LeadImportDialog({ children }: LeadImportDialogProps) {
  const { t } = useTranslation();
  const { addLead } = useLeads();
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [manualLead, setManualLead] = useState(getInitialManualLead());

  const resetStates = () => {
    setError('');
    setSuccess('');
    setJsonInput('');
    setManualLead(getInitialManualLead());
  };

  const handleJsonImport = () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { validLeads, allErrors } = processJsonImport(jsonInput, t);
      
      validLeads.forEach((lead: Lead) => addLead(lead));
      setSuccess(getImportSuccessMessage(validLeads.length, allErrors.length, t));
      
      setTimeout(() => {
        resetStates();
        setOpen(false);
      }, 2000);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : t('leads.import.error_invalid_json'));
    } finally {
      setLoading(false);
    }
  };

  const handleManualAdd = () => {
    setError('');
    setSuccess('');

    const validation = validateManualLead(manualLead, t);
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setLoading(true);

    try {
      const newLead: Omit<Lead, 'id'> = {
        ...manualLead,
      };

      addLead(newLead);
      setSuccess(t('leads.import.success_add'));
      
      setTimeout(() => {
        resetStates();
        setOpen(false);
      }, 2000);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : t('leads.import.error_add_lead'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle>{t('leads.import.title')}</DialogTitle>
          <DialogDescription>
            {t('leads.import.description')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="json" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json">{t('leads.import.tab_json')}</TabsTrigger>
            <TabsTrigger value="manual">{t('leads.import.tab_manual')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="json" className="space-y-4">
            <JsonImportTab
              jsonInput={jsonInput}
              setJsonInput={setJsonInput}
              error={error}
              success={success}
              loading={loading}
              onImport={handleJsonImport}
              onCancel={handleCancel}
            />
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <ManualImportTab
              manualLead={manualLead}
              setManualLead={setManualLead}
              error={error}
              success={success}
              loading={loading}
              onAdd={handleManualAdd}
              onCancel={handleCancel}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}