import { api } from '../../lib/api';
import type { ApiResponse } from '../../types/api.types';
import type { PatientProfile } from '../../types/profile.types';

// The profile endpoint returns the record under `userData` (not `data`)
type ProfileResponse = ApiResponse<never> & {
  userData?: PatientProfile;
};

export const getProfile = async (): Promise<PatientProfile> => {
  const { data } = await api.get<ProfileResponse>('/appointments/profile');
  if (!data.success || !data.userData) {
    throw new Error(data.message || 'Could not load profile');
  }
  return data.userData;
};

/**
 * Multipart upload — carries the optional profile image alongside the text
 * fields. `address` must be a JSON string; the backend does JSON.parse on it.
 */
export const updateProfile = async (formData: FormData): Promise<void> => {
  const { data } = await api.post<ApiResponse<never>>(
    '/appointments/profile',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  if (!data.success) throw new Error(data.message || 'Update failed');
};
