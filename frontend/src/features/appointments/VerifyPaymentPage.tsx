import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useVerifyStripePayment } from './useAppointments';

/**
 * Landing page for the Stripe redirect flow. Stripe sends the browser to
 * /verify?success=true|false&appointmentId=... after checkout; we confirm
 * with the backend, then send the user to their appointments list.
 */
export const VerifyPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const verifyMutation = useVerifyStripePayment();
  const [outcome, setOutcome] = useState<'verifying' | 'success' | 'failed'>(
    'verifying',
  );

  // React StrictMode fires effects twice in dev — the ref guarantees the
  // backend verification call happens only once
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const success = searchParams.get('success');
    const appointmentId = searchParams.get('appointmentId');

    if (!success || !appointmentId) {
      setOutcome('failed');
      return;
    }

    verifyMutation.mutate(
      { appointmentId, success },
      {
        onSuccess: () => setOutcome('success'),
        onError: () => setOutcome('failed'),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: 'auto',
        mt: 8,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {outcome === 'verifying' && (
        <>
          <CircularProgress size={48} />
          <Typography variant="h2">Verifying payment...</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Please wait while we confirm your payment with Stripe.
          </Typography>
        </>
      )}

      {outcome === 'success' && (
        <>
          <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main' }} />
          <Typography variant="h2">Payment successful</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Your appointment is confirmed.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/my-appointments"
          >
            Go to My Appointments
          </Button>
        </>
      )}

      {outcome === 'failed' && (
        <>
          <CancelIcon sx={{ fontSize: 64, color: 'error.main' }} />
          <Typography variant="h2">Payment failed</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            The payment could not be completed. You can try again from your
            appointments page.
          </Typography>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/my-appointments"
          >
            Back to My Appointments
          </Button>
        </>
      )}
    </Box>
  );
};
