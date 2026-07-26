import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { StatusChip } from '../../components/common/StatusChip';
import { parseSlotDateTime, slotDateToDisplay } from '../../lib/slotUtils';
import { CURRENCY_SYMBOL } from '../../lib/constants';
import type { Appointment } from '../../types/appointment.types';

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// Status is not stored as one field — it's derived from three flags
const getAppointmentStatus = (
  appointment: Appointment,
): AppointmentStatus => {
  if (appointment.cancelled) return 'cancelled';
  if (appointment.isCompleted) return 'completed';
  if (appointment.payment) return 'confirmed';
  return 'pending';
};

type AppointmentCardProps = {
  appointment: Appointment;
  isPaying: boolean;
  onPay: (appointmentId: string) => void;
  onCancel: (appointment: Appointment) => void;
};

/**
 * One appointment row: doctor info + date/time on the left, status chip and
 * status-dependent actions on the right (PRD US-3.3).
 */
export const AppointmentCard = ({
  appointment,
  isPaying,
  onPay,
  onCancel,
}: AppointmentCardProps) => {
  const status = getAppointmentStatus(appointment);
  const appointmentDate = parseSlotDateTime(
    appointment.slotDate,
    appointment.slotTime,
  );
  // Pending is always cancellable; confirmed only before it starts (PRD US-3.3)
  const canCancel =
    status === 'pending' ||
    (status === 'confirmed' && appointmentDate > new Date());

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2.5,
        px: { xs: 2, sm: 3 },
        py: 2,
        borderRadius: 4,
      }}
    >
      <Avatar
        src={appointment.docData.image}
        alt={appointment.docData.name}
        sx={{
          width: { xs: 64, sm: 72 },
          height: { xs: 64, sm: 72 },
          border: '3px solid',
          borderColor: 'primary.light',
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
          {appointment.docData.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          {appointment.docData.speciality} · {CURRENCY_SYMBOL}
          {appointment.amount}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2.5 },
            mt: 0.75,
            color: 'text.secondary',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.813rem' }}>
              {slotDateToDisplay(appointment.slotDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.813rem' }}>
              {appointment.slotTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'stretch', sm: 'flex-end' },
          gap: 1.5,
        }}
      >
        <StatusChip status={status} />
        {(status === 'pending' || canCancel) && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {status === 'pending' && (
              <Button
                variant="contained"
                size="small"
                loading={isPaying}
                onClick={() => onPay(appointment._id)}
              >
                Pay Online
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onCancel(appointment)}
              >
                Cancel
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};
