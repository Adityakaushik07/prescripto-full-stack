import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  bookAppointment,
  cancelAppointment,
  createStripeSession,
  getAppointments,
  verifyStripePayment,
} from './appointmentService';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      // The new appointment appears in the list, and the doctor's booked
      // slots changed — refresh both
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      // Cancelling frees the doctor's slot, so refresh the directory too
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};

export const useStripePayment = () => {
  return useMutation({
    mutationFn: createStripeSession,
  });
};

export const useVerifyStripePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appointmentId,
      success,
    }: {
      appointmentId: string;
      success: string;
    }) => verifyStripePayment(appointmentId, success),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
