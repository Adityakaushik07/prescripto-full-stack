import { api } from '../../lib/api';
import type { ApiResponse } from '../../types/api.types';
import type {
  Appointment,
  BookingRequest,
} from '../../types/appointment.types';

// The list endpoint returns the array under `appointments` (not `data`)
type AppointmentListResponse = ApiResponse<never> & {
  appointments?: Appointment[];
};

// The Stripe session endpoint returns the checkout URL at the top level
type StripeSessionResponse = ApiResponse<never> & {
  session_url?: string;
};

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<AppointmentListResponse>('/appointments');
  if (!data.success || !data.appointments) {
    throw new Error(data.message || 'Could not load appointments');
  }
  return data.appointments;
};

export const bookAppointment = async (
  booking: BookingRequest,
): Promise<void> => {
  const { data } = await api.post<ApiResponse<never>>(
    '/appointments/book',
    booking,
  );
  if (!data.success) throw new Error(data.message || 'Booking failed');
};

export const cancelAppointment = async (
  appointmentId: string,
): Promise<void> => {
  const { data } = await api.post<ApiResponse<never>>('/appointments/cancel', {
    appointmentId,
  });
  if (!data.success) throw new Error(data.message || 'Cancellation failed');
};

export const createStripeSession = async (
  appointmentId: string,
): Promise<string> => {
  const { data } = await api.post<StripeSessionResponse>(
    '/appointments/payment-stripe',
    { appointmentId },
  );
  if (!data.success || !data.session_url) {
    throw new Error(data.message || 'Could not start payment');
  }
  return data.session_url;
};

export const verifyStripePayment = async (
  appointmentId: string,
  success: string,
): Promise<void> => {
  const { data } = await api.post<ApiResponse<never>>(
    '/appointments/verify-stripe',
    { appointmentId, success },
  );
  if (!data.success) throw new Error(data.message || 'Payment failed');
};
