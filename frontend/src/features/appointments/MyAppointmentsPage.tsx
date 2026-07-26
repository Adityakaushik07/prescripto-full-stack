import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Skeleton, Stack } from '@mui/material';
import { EventBusy as EventBusyIcon } from '@mui/icons-material';
import { AppointmentCard } from './AppointmentCard';
import {
  useAppointments,
  useCancelAppointment,
  useStripePayment,
} from './useAppointments';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';
import { getApiErrorMessage } from '../../lib/api';
import type { Appointment } from '../../types/appointment.types';

const RowSkeleton = () => (
  <Skeleton variant="rounded" sx={{ height: 112, borderRadius: 4 }} />
);

/** Patient's appointment list with pay + cancel actions (PRD US-3.3..3.5). */
export const MyAppointmentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast, toastElement } = useToast();

  // The doctor detail page redirects here after a successful booking
  useEffect(() => {
    if (location.state?.booked) {
      showToast('Appointment booked!', 'success');
      // Clear the state so a refresh doesn't re-show the toast
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: appointments, isLoading, isError, error, refetch } =
    useAppointments();
  const cancelMutation = useCancelAppointment();
  const payMutation = useStripePayment();

  // The appointment awaiting confirmation in the cancel dialog
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  // Newest bookings first (PRD US-3.3)
  const sortedAppointments = [...(appointments ?? [])].sort(
    (a, b) => b.date - a.date,
  );

  const handlePay = (appointmentId: string) => {
    payMutation.mutate(appointmentId, {
      // Stripe checkout is a redirect flow — hand the browser over
      onSuccess: (sessionUrl) => {
        window.location.href = sessionUrl;
      },
      onError: (payError) => {
        showToast(getApiErrorMessage(payError), 'error');
      },
    });
  };

  const handleCancelConfirm = () => {
    if (!cancelTarget) return;
    cancelMutation.mutate(cancelTarget._id, {
      onSuccess: () => {
        showToast('Appointment cancelled', 'success');
        setCancelTarget(null);
      },
      onError: (cancelError) => {
        showToast(getApiErrorMessage(cancelError), 'error');
        setCancelTarget(null);
      },
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <PageHeader title="My Appointments" />

      {isLoading && (
        <Stack spacing={1.5}>
          {[1, 2, 3].map((i) => (
            <RowSkeleton key={i} />
          ))}
        </Stack>
      )}

      {isError && (
        <Box sx={{ textAlign: 'center' }}>
          <EmptyState
            text={error.message || 'Could not load appointments'}
            icon={<EventBusyIcon sx={{ fontSize: 48 }} />}
            sx={{ pb: 2 }}
          />
          <Button variant="outlined" onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      )}

      {!isLoading && !isError && sortedAppointments.length === 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <EmptyState
            text="No appointments yet"
            icon={<EventBusyIcon sx={{ fontSize: 48 }} />}
            sx={{ pb: 2 }}
          />
          <Button variant="contained" onClick={() => navigate('/doctors')}>
            Browse Doctors
          </Button>
        </Box>
      )}

      {!isLoading && !isError && sortedAppointments.length > 0 && (
        <Stack spacing={1.5}>
          {sortedAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              isPaying={
                payMutation.isPending && payMutation.variables === appointment._id
              }
              onPay={handlePay}
              onCancel={setCancelTarget}
            />
          ))}
        </Stack>
      )}

      <ConfirmDialog
        open={!!cancelTarget}
        title="Cancel appointment?"
        message={`Are you sure you want to cancel your appointment with ${cancelTarget?.docData.name ?? 'this doctor'}? This will free up the slot for other patients.`}
        confirmText="Yes, cancel it"
        confirmColor="error"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancelTarget(null)}
      />

      {toastElement}
    </Box>
  );
};
