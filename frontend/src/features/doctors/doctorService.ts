import { api } from '../../lib/api';
import type { ApiResponse } from '../../types/api.types';
import type { Doctor } from '../../types/doctor.types';

// The public list endpoint returns the array under `doctors` (not `data`)
type DoctorListResponse = ApiResponse<never> & {
  doctors?: Doctor[];
};

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await api.get<DoctorListResponse>('/doctors/list');
  if (!data.success || !data.doctors) {
    throw new Error(data.message || 'Could not load doctors');
  }
  return data.doctors;
};
