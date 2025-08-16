import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLeads } from '../contexts/LeadsContext';
import { Lead } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LeadImportDialogProps {
  children: React.ReactNode;
}

export function LeadImportDialog({ children }: LeadImportDialogProps) {
  const { t } = useTranslation();
  const { addLead, importLeads } = useLeads();
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [manualLead, setManualLead] = useState({
    name: '',
    company: '',
    email: '',
    source: '',
    score: 50,
    status: 'New' as 'New' | 'Contacted' | 'Qualified',
  });

  const resetStates = () => {
    setError('');
    setSuccess('');
    setJsonInput('');
    setManualLead({
      name: '',
      company: '',
      email: '',
      source: '',
      score: 50,
      status: 'New',
    });
  };

  const validateLead = (lead: any): lead is Lead => {
    return (
      typeof lead.name === 'string' && lead.name.trim() !== '' &&
      typeof lead.company === 'string' && lead.company.trim() !== '' &&
      typeof lead.email === 'string' && lead.email.trim() !== '' &&
      typeof lead.source === 'string' && lead.source.trim() !== '' &&
      typeof lead.score === 'number' && lead.score >= 0 && lead.score <= 100 &&
      typeof lead.status === 'string' && ['New', 'Contacted', 'Qualified'].includes(lead.status)
    );
  };

  const handleJsonImport = () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const parsedLeads = JSON.parse(jsonInput) as any[];
      
      if (!Array.isArray(parsedLeads)) {
        throw new Error(t('leads.import.error_invalid_json'));
      }

      if (parsedLeads.length === 0) {
        throw new Error(t('leads.import.error_empty_json'));
      }

      const validLeads = parsedLeads.filter((lead: any) => validateLead(lead));
      const invalidCount = parsedLeads.length - validLeads.length;

      if (validLeads.length === 0) {
        throw new Error(t('leads.import.error_no_valid_leads'));
      }

      validLeads.forEach((lead: Lead) => addLead(lead));
      setSuccess(`${t('leads.import.success_import')} ${validLeads.length} leads importados${invalidCount > 0 ? `, ${invalidCount} inválidos ignorados` : ''}.`);
      
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

    if (!manualLead.name || !manualLead.company || !manualLead.email || !manualLead.source) {
      setError(t('leads.import.error_required_fields'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(manualLead.email)) {
      setError('Please enter a valid email address');
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
      setError(err instanceof Error ? err.message : 'Erro ao adicionar lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON</Label>
              <Textarea
                id="json-input"
                placeholder={t('leads.import.json_placeholder')}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                {t('leads.import.json_help')}
              </p>
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                {success}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t('leads.import.button_cancel')}
              </Button>
              <Button onClick={handleJsonImport} disabled={loading || !jsonInput.trim()}>
                {loading ? t('leads.import.importing') : t('leads.import.button_import')}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manual-name">{t('leads.import.manual_name')}</Label>
                <Input
                  id="manual-name"
                  value={manualLead.name}
                  onChange={(e) => setManualLead(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-company">{t('leads.import.manual_company')}</Label>
                <Input
                  id="manual-company"
                  value={manualLead.company}
                  onChange={(e) => setManualLead(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Nome da empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-email">{t('leads.import.manual_email')}</Label>
                <Input
                  id="manual-email"
                  type="email"
                  value={manualLead.email}
                  onChange={(e) => setManualLead(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-source">{t('leads.import.manual_source')}</Label>
                <Input
                  id="manual-source"
                  value={manualLead.source}
                  onChange={(e) => setManualLead(prev => ({ ...prev, source: e.target.value }))}
                  placeholder="Website, LinkedIn, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-score">{t('leads.import.manual_score')}</Label>
                <Input
                  id="manual-score"
                  type="number"
                  min="0"
                  max="100"
                  value={manualLead.score}
                  onChange={(e) => setManualLead(prev => ({ ...prev, score: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-status">{t('leads.import.manual_status')}</Label>
                <Select value={manualLead.status} onValueChange={(value: 'New' | 'Contacted' | 'Qualified') => setManualLead(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                {success}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t('leads.import.button_cancel')}
              </Button>
              <Button onClick={handleManualAdd} disabled={loading}>
                {loading ? t('leads.import.adding') : t('leads.import.button_add')}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}