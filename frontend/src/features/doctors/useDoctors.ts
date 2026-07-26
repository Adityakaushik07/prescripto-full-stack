import { useQuery } from '@tanstack/react-query';
import { getDoctors } from './doctorService';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });
};

/**
 * The backend has no GET /doctors/:id endpoint, so the detail page derives a
 * single doctor from the cached list — no extra network call.
 */
export const useDoctor = (doctorId: string | undefined) => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
    select: (doctors) => doctors.find((doctor) => doctor._id === doctorId),
  });
};
