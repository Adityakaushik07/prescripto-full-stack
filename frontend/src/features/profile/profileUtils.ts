import type { PatientProfile } from '../../types/profile.types';
import type { ProfileFormData } from './profileSchema';

// The backend stores these placeholders when the user hasn't set a value yet
const UNSET_VALUES = new Set(['Not Selected', '']);

export const unsetToEmpty = (value: string | undefined): string =>
  value && !UNSET_VALUES.has(value) ? value : '';

/** Maps the API profile shape onto the flat form fields. */
export const toFormValues = (profile: PatientProfile): ProfileFormData => ({
  name: profile.name,
  phone: unsetToEmpty(profile.phone),
  addressLine1: profile.address?.line1 ?? '',
  addressLine2: profile.address?.line2 ?? '',
  gender: (unsetToEmpty(profile.gender) ||
    'Male') as ProfileFormData['gender'],
  dob: unsetToEmpty(profile.dob),
});
