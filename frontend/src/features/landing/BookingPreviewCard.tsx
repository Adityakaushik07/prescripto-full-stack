import { Avatar, Box, Button, Typography } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  SLATE_200,
  SLATE_400,
  SLATE_500,
  SLATE_600,
  SLATE_900,
  TEAL_50,
  TEAL_100,
  TEAL_600,
  TEAL_700,
} from './landingTheme';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// Static mini-calendar like the mockup: month starts Tuesday, days 1-31
const CALENDAR_CELLS: (number | null)[] = [
  null,
  null,
  ...Array.from({ length: 31 }, (_, i) => i + 1),
];
const LIGHT_HIGHLIGHT_DAYS = new Set([9, 10, 11, 12]);
const SELECTED_DAY = 15;

const MiniCalendar = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      rowGap: 0.5,
      mb: 2,
    }}
  >
    {WEEKDAY_LABELS.map((day, index) => (
      <Typography
        key={`${day}-${index}`}
        sx={{
          textAlign: 'center',
          fontSize: '0.65rem',
          fontWeight: 600,
          color: SLATE_400,
          py: 0.5,
        }}
      >
        {day}
      </Typography>
    ))}
    {CALENDAR_CELLS.map((day, index) => {
      const isLight = day !== null && LIGHT_HIGHLIGHT_DAYS.has(day);
      const isSelected = day === SELECTED_DAY;
      return (
        <Box
          key={index}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: isSelected ? 700 : 500,
              color: isSelected ? '#FFFFFF' : isLight ? TEAL_700 : SLATE_600,
              bgcolor: isSelected ? TEAL_600 : isLight ? TEAL_100 : 'transparent',
            }}
          >
            {day}
          </Box>
        </Box>
      );
    })}
  </Box>
);

/**
 * The floating, slightly-rotated booking card on the hero's right side —
 * a miniature of the real slot-booking UI (see docs/mockups/landing.png).
 */
export const BookingPreviewCard = () => (
  <Box sx={{ position: 'relative', width: { xs: 300, md: 330 } }}>
    {/* Stacked back card for depth */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: '20px',
        bgcolor: 'rgba(255,255,255,0.7)',
        border: `1px solid ${SLATE_200}`,
        transform: 'rotate(-3deg) scale(1.03)',
      }}
    />
    <Box
      sx={{
        position: 'relative',
        borderRadius: '20px',
        bgcolor: '#FFFFFF',
        border: `1px solid ${SLATE_200}`,
        boxShadow:
          '0 24px 60px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)',
        transform: 'rotate(3deg)',
        p: 2.5,
      }}
    >
      {/* Doctor header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: TEAL_100,
            color: TEAL_700,
            fontSize: 13,
            fontWeight: 700,
            border: `2px solid ${TEAL_600}`,
          }}
        >
          MS
        </Avatar>
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: '0.875rem', color: SLATE_900 }}
          >
            Dr. Meera Shah
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: SLATE_500 }}>
            Cardiologist
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 18, color: SLATE_400 }} />
        <Typography
          sx={{ fontWeight: 700, fontSize: '0.813rem', color: SLATE_900 }}
        >
          Calendar
        </Typography>
        <ChevronRightIcon sx={{ fontSize: 18, color: SLATE_400 }} />
      </Box>

      <MiniCalendar />

      {/* Time chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '999px',
            border: `1.5px solid ${TEAL_600}`,
            color: TEAL_700,
            fontSize: '0.8rem',
            fontWeight: 600,
            bgcolor: TEAL_50,
          }}
        >
          10:30 AM
        </Box>
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '999px',
            border: `1px solid ${SLATE_200}`,
            color: SLATE_600,
            fontSize: '0.8rem',
            fontWeight: 500,
          }}
        >
          2:00 PM
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: TEAL_600,
          boxShadow: 'none',
          py: 1.1,
          borderRadius: '10px',
          '&:hover': { bgcolor: TEAL_700, boxShadow: 'none' },
        }}
      >
        Confirm Booking
      </Button>
    </Box>
  </Box>
);
