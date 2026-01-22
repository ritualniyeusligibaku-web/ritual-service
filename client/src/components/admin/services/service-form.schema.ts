import { z } from 'zod';

// Helper schema for localized strings
const localizedStringSchema = z.object({
  az: z.string().min(1, 'Azerbaijani translation is required'),
  ru: z.string().min(1, 'Russian translation is required'),
  en: z.string().min(1, 'English translation is required'),
});

// Optional localized string schema
const optionalLocalizedStringSchema = z.object({
  az: z.string().optional(),
  ru: z.string().optional(),
  en: z.string().optional(),
}).optional();

// Main service form schema
export const serviceFormSchema = z.object({
  name: localizedStringSchema,
  description: localizedStringSchema,
  image: z.string().url('Please provide a valid image URL').min(1, 'Image URL is required'),
  title1: optionalLocalizedStringSchema,
  paragraph1: optionalLocalizedStringSchema,
  title2: optionalLocalizedStringSchema,
  paragraph2: optionalLocalizedStringSchema,
  title3: optionalLocalizedStringSchema,
  paragraph3: optionalLocalizedStringSchema,
  title4: optionalLocalizedStringSchema,
  paragraph4: optionalLocalizedStringSchema,
  title5: optionalLocalizedStringSchema,
  paragraph5: optionalLocalizedStringSchema,
  title6: optionalLocalizedStringSchema,
  paragraph6: optionalLocalizedStringSchema,
  title7: optionalLocalizedStringSchema,
  paragraph7: optionalLocalizedStringSchema,
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;
