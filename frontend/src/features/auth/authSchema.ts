import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['patient', 'doctor', 'admin'], { error: 'Select a role' }),
});

// Password rules mirror what the backend enforces (min 8) plus the PRD's
// 1-uppercase + 1-number requirement, so users get feedback before submit
export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[0-9]/, 'Must contain at least 1 number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    // Attaches the error to confirmPassword so it shows under that field
    path: ['confirmPassword'],
  });

// Derive the TypeScript types from the schemas — no duplication!
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
