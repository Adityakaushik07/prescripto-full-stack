import { Chip } from '@mui/material';

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// Muted pastel palette — soft backgrounds, readable text. See docs/DESIGN.md.
const STATUS_STYLES: Record<
  AppointmentStatus,
  { label: string; bg: string; color: string }
> = {
  pending: { label: 'Pending', bg: '#FEF3C7', color: '#92400E' },
  confirmed: { label: 'Confirmed', bg: '#DBEAFE', color: '#1E40AF' },
  completed: { label: 'Completed', bg: '#D1FAE5', color: '#065F46' },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#991B1B' },
};

type StatusChipProps = {
  status: AppointmentStatus;
  label?: string;
  size?: 'small' | 'medium';
};

/** Colored status chip with muted pastel backgrounds (not saturated neon). */
export const StatusChip = ({ status, label, size = 'small' }: StatusChipProps) => {
  const style = STATUS_STYLES[status];
  return (
    <Chip
      label={label ?? style.label}
      size={size}
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 600,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
};