// Base URL for every API call — falls back to the local dev server when no
// env var is provided, so the app works out-of-the-box on a fresh checkout
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

// INR because the platform targets Indian patients and doctors
export const CURRENCY_SYMBOL = '₹';

// Mirrors the specialities on the backend so filter chips and the add-doctor
// form stay in sync with what the database actually accepts
export const SPECIALITIES = [
  'General Physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Gastroenterologist',
] as const;