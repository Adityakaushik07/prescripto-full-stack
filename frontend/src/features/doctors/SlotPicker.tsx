import { useMemo } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { formatSlotDate, formatSlotTime } from '../../lib/slotUtils';

const DAYS_TO_SHOW = 7;
// Slots run 10:00 AM -> 9:00 PM at 30-minute intervals (PRD US-3.1), so the
// last bookable start time is 8:30 PM
const FIRST_SLOT_HOUR = 10;
const LAST_SLOT_HOUR = 21;
const SLOT_INTERVAL_MINUTES = 30;

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type SlotSelection = {
  slotDate: string;
  slotTime: string;
};

type SlotPickerProps = {
  // Booked slots from the doctor record: { "25_7_2026": ["02:00 PM", ...] }
  bookedSlots: Record<string, string[]>;
  selected: SlotSelection | null;
  onSelect: (selection: SlotSelection) => void;
};

type DayOption = {
  slotDate: string;
  dayName: string;
  dayNumber: number;
  times: string[];
};

const buildDays = (bookedSlots: Record<string, string[]>): DayOption[] => {
  const days: DayOption[] = [];
  const now = new Date();

  for (let offset = 0; offset < DAYS_TO_SHOW; offset++) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);
    const slotDate = formatSlotDate(date);
    const bookedForDay = bookedSlots[slotDate] ?? [];

    const times: string[] = [];
    const slotStart = new Date(date);
    slotStart.setHours(FIRST_SLOT_HOUR, 0, 0, 0);

    while (slotStart.getHours() < LAST_SLOT_HOUR) {
      const isToday = offset === 0;
      // Past slots are hidden for today; booked slots are always hidden
      if (!bookedForDay.includes(formatSlotTime(slotStart)) && !(isToday && slotStart <= now)) {
        times.push(formatSlotTime(slotStart));
      }
      slotStart.setMinutes(slotStart.getMinutes() + SLOT_INTERVAL_MINUTES);
    }

    days.push({
      slotDate,
      dayName: DAY_NAMES[date.getDay()],
      dayNumber: date.getDate(),
      times,
    });
  }

  return days;
};

/**
 * Date chips (next 7 days) + time chips for the selected date. Only one slot
 * can be selected at a time; booked and past slots are hidden, not disabled.
 */
export const SlotPicker = ({
  bookedSlots,
  selected,
  onSelect,
}: SlotPickerProps) => {
  const days = useMemo(() => buildDays(bookedSlots), [bookedSlots]);

  // Default to the first day when nothing is selected yet
  const activeDate = selected?.slotDate ?? days[0].slotDate;
  const activeDay =
    days.find((day) => day.slotDate === activeDate) ?? days[0];

  return (
    <Box>
      <Typography sx={{ fontWeight: 600, mb: 1.5 }}>Select Date</Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ overflowX: 'auto', pb: 0.5 }}
        useFlexGap
      >
        {days.map((day) => {
          const isActive = day.slotDate === activeDate;
          return (
            <Chip
              key={day.slotDate}
              clickable
              onClick={() =>
                // Switching date clears the time — only one slot at a time
                onSelect({ slotDate: day.slotDate, slotTime: '' })
              }
              label={
                <Box sx={{ textAlign: 'center', lineHeight: 1.2 }}>
                  <Box sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                    {day.dayName}
                  </Box>
                  <Box sx={{ fontSize: '0.95rem', fontWeight: 700 }}>
                    {day.dayNumber}
                  </Box>
                </Box>
              }
              sx={{
                height: 'auto',
                py: 1,
                px: 1.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: isActive ? 'primary.main' : 'divider',
                bgcolor: isActive ? 'primary.main' : 'background.paper',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                '& .MuiChip-label': { px: 0.5 },
                '&:hover': {
                  bgcolor: isActive
                    ? 'primary.dark'
                    : 'rgba(8, 145, 178, 0.08)',
                },
              }}
            />
          );
        })}
      </Stack>

      <Typography sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}>
        Available Slots
      </Typography>
      {activeDay.times.length === 0 ? (
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          No slots available on this date
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {activeDay.times.map((time) => {
            const isSelected =
              selected?.slotDate === activeDate && selected?.slotTime === time;
            return (
              <Chip
                key={time}
                label={time}
                clickable
                onClick={() =>
                  onSelect({ slotDate: activeDate, slotTime: time })
                }
                sx={{
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'background.paper',
                  color: isSelected ? 'primary.contrastText' : 'text.primary',
                  fontWeight: isSelected ? 600 : 500,
                  '&:hover': {
                    bgcolor: isSelected
                      ? 'primary.dark'
                      : 'rgba(8, 145, 178, 0.08)',
                  },
                }}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};
