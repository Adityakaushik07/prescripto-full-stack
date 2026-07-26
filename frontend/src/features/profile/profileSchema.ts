import { z } from 'zod';

// Address lines are optional — the PRD only validates Name, Phone, Gender, DOB
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  addressLine1: z.string(),
  addressLine2: z.string(),
  gender: z.enum(['Male', 'Female', 'Other'], { error: 'Select a gender' }),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date < new Date();
    }, 'Date of birth must be in the past'),
});

// Derive the TypeScript type from the schema — no duplication!
export type ProfileFormData = z.infer<typeof profileSchema>;
