import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLeads } from '../contexts/leads-provider';
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

  const validateLead = (lead: any, index: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!lead || typeof lead !== 'object') {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_object')}`);
      return { isValid: false, errors };
    }
    
    if (typeof lead.name !== 'string' || lead.name.trim() === '') {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_name')}`);
    }
    
    if (typeof lead.company !== 'string' || lead.company.trim() === '') {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_company')}`);
    }
    
    if (typeof lead.email !== 'string' || lead.email.trim() === '') {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_email')}`);
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lead.email)) {
        errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_email_format')}`);
      }
    }
    
    if (typeof lead.source !== 'string' || lead.source.trim() === '') {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_source')}`);
    }
    
    if (typeof lead.score !== 'number' || lead.score < 0 || lead.score > 100) {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_score')}`);
    }
    
    if (typeof lead.status !== 'string' || !['New', 'Contacted', 'Qualified'].includes(lead.status)) {
      errors.push(`Lead ${index + 1}: ${t('leads.import.error_invalid_status')}`);
    }
    
    return { isValid: errors.length === 0, errors };
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

      const validationResults = parsedLeads.map((lead: any, index: number) => ({
        lead,
        validation: validateLead(lead, index)
      }));
      
      const validLeads = validationResults.filter(result => result.validation.isValid).map(result => result.lead);
      const allErrors = validationResults.flatMap(result => result.validation.errors);
      
      if (allErrors.length > 0 && validLeads.length === 0) {
        throw new Error(`${t('leads.import.error_validation_failed')}:\n${allErrors.slice(0, 5).join('\n')}${allErrors.length > 5 ? `\n${t('leads.import.error_more_errors', { count: allErrors.length - 5 })}` : ''}`);
      }
      
      if (allErrors.length > 0) {
        console.warn('Validation errors found:', allErrors);
      }

      validLeads.forEach((lead: Lead) => addLead(lead));
      setSuccess(`${t('leads.import.success_import')} ${validLeads.length} ${t('leads.import.leads_imported')}${allErrors.length > 0 ? `, ${allErrors.length} ${t('leads.import.invalid_ignored')}` : ''}.`);
      
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
      setError(t('detail_sheet.messages.invalid_email'));
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
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON</Label>
              <Textarea
                id="json-input"
                placeholder={`[
  {
    "name": "João Silva",
    "company": "Tech Corp",
    "email": "joao@techcorp.com",
    "source": "Website",
    "score": 85,
    "status": "New"
  },
  {
    "name": "Maria Santos",
    "company": "Digital Solutions",
    "email": "maria@digital.com",
    "source": "LinkedIn",
    "score": 92,
    "status": "Qualified"
  }
]`}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[200px] bg-white border-gray-200 shadow-sm font-mono text-sm"
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
              <Button variant="secondary" className='border-gray-200 shadow-sm' onClick={() => setOpen(false)}>
                {t('leads.import.button_cancel')}
              </Button>
              <Button variant="default" onClick={handleJsonImport} className='bg-blue-500 hover:bg-blue-600 text-white'  disabled={loading || !jsonInput.trim()}>
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
                  className='border-gray-200 shadow-sm'
                  value={manualLead.name}
                  onChange={(e) => setManualLead(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('leads.import.placeholder_name')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-company">{t('leads.import.manual_company')}</Label>
                <Input
                  id="manual-company"
                  className='border-gray-200 shadow-sm'
                  value={manualLead.company}
                  onChange={(e) => setManualLead(prev => ({ ...prev, company: e.target.value }))}
                  placeholder={t('leads.import.placeholder_company')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-email">{t('leads.import.manual_email')}</Label>
                <Input
                  id="manual-email"
                  className='border-gray-200 shadow-sm'
                  type="email"
                  value={manualLead.email}
                  onChange={(e) => setManualLead(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('leads.import.placeholder_email')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-source">{t('leads.import.manual_source')}</Label>
                <Input
                  id="manual-source"
                  className='border-gray-200 shadow-sm'
                  value={manualLead.source}
                  onChange={(e) => setManualLead(prev => ({ ...prev, source: e.target.value }))}
                  placeholder={t('leads.import.placeholder_source')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-score">{t('leads.import.manual_score')}</Label>
                <Input
                  id="manual-score"
                  className='border-gray-200 shadow-sm'
                  type="number"
                  min="0"
                  max="100"
                  value={manualLead.score}
                  onChange={(e) => setManualLead(prev => ({ ...prev, score: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-status">{t('leads.import.manual_status')}</Label>
                <Select value={manualLead.status}  onValueChange={(value: 'New' | 'Contacted' | 'Qualified') => setManualLead(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className='border-gray-200 shadow-sm'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-white border-gray-200 shadow-sm'>
                    <SelectItem value="New">{t('leads.status.new')}</SelectItem>
                    <SelectItem value="Contacted">{t('leads.status.contacted')}</SelectItem>
                    <SelectItem value="Qualified">{t('leads.status.qualified')}</SelectItem>
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
              <Button variant="secondary" className='bg-white border-gray-200 shadow-sm' onClick={() => setOpen(false)}>
                {t('leads.import.button_cancel')}
              </Button>
              <Button variant="default" onClick={handleManualAdd} className='bg-blue-500 hover:bg-blue-600 text-white' disabled={loading}>
                {loading ? t('leads.import.adding') : t('leads.import.button_add')}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}