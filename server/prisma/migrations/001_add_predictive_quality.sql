-- Migration to add predictive quality field
ALTER TABLE Lead ADD COLUMN predictiveQuality INTEGER DEFAULT 0;

-- Update existing leads with calculated predictive quality
UPDATE Lead SET predictiveQuality = CASE 
  WHEN source = 'Referral' THEN ROUND((score * 0.7) + (100 * 0.3))
  WHEN source = 'Website' THEN ROUND((score * 0.7) + (80 * 0.3))
  WHEN source = 'LinkedIn' THEN ROUND((score * 0.7) + (75 * 0.3))
  WHEN source = 'Cold Email' THEN ROUND((score * 0.7) + (40 * 0.3))
  WHEN source = 'Social Media' THEN ROUND((score * 0.7) + (60 * 0.3))
  WHEN source = 'Event' THEN ROUND((score * 0.7) + (85 * 0.3))
  WHEN source = 'Partner' THEN ROUND((score * 0.7) + (90 * 0.3))
  ELSE ROUND((score * 0.7) + (50 * 0.3))
END;
