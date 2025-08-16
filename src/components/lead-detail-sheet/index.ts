export { LeadDetailSheet } from './lead-detail-sheet';
export { LeadHeader } from './lead-header';
export { LeadFormFields } from './lead-form-fields';
export { LeadInfoDisplay } from './lead-info-display';
export { SheetActions } from './sheet-actions';


export type {
  LeadDetailSheetProps,
  LeadFormData,
  SheetState,
  LeadHeaderProps,
  LeadFormFieldsProps,
  LeadInfoDisplayProps,
  SheetActionsProps
} from './types';


export {
  simulateSaveApi,
  simulateConvertApi,
  validateLeadForm,
  getScoreGradientClass,
  getScoreBarWidth,
  getInitials,
  getStatusOptions,
  resetFormState,
  getInputErrorClasses
} from './utils';


export type { Lead, FormState } from '@/components/shared';