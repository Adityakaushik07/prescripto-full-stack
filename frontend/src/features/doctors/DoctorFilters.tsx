import { useEffect, useState } from 'react';
import {
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { SPECIALITIES } from '../../lib/constants';

type DoctorSearchProps = {
  value: string;
  onChange: (search: string) => void;
};

/**
 * Rounded search field for the doctors directory. Debounces keystrokes by
 * 300ms (per PRD US-2.3) so the list doesn't re-filter on every character.
 */
export const DoctorSearch = ({ value, onChange }: DoctorSearchProps) => {
  // Local draft so the input feels instant while the filter lags 300ms behind
  const [draft, setDraft] = useState(value);

  // Sync the draft when the search is reset from outside (e.g. URL change)
  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (draft !== value) onChange(draft);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  return (
    <TextField
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      placeholder="Search by name or specialty..."
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: draft ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Clear search"
                onClick={() => setDraft('')}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: { borderRadius: '999px', bgcolor: 'background.paper' },
        },
      }}
      sx={{ width: { xs: '100%', sm: 340 } }}
    />
  );
};

type SpecialityChipsProps = {
  value: string;
  onChange: (speciality: string) => void;
};

/** Pill filter chips — "All" plus every speciality, toggle-style (PRD US-2.2). */
export const SpecialityChips = ({ value, onChange }: SpecialityChipsProps) => {
  const handleClick = (speciality: string) => {
    // Clicking the active chip again clears the filter (toggle behavior)
    onChange(value === speciality ? '' : speciality);
  };

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {['All', ...SPECIALITIES].map((speciality) => {
        const isActive =
          speciality === 'All' ? value === '' : value === speciality;
        return (
          <Chip
            key={speciality}
            label={speciality}
            clickable
            onClick={() => handleClick(speciality === 'All' ? '' : speciality)}
            sx={{
              borderRadius: '999px',
              px: 0.5,
              fontWeight: isActive ? 600 : 500,
              border: '1px solid',
              borderColor: isActive ? 'primary.main' : 'divider',
              bgcolor: isActive ? 'primary.main' : 'background.paper',
              color: isActive ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                bgcolor: isActive ? 'primary.dark' : 'rgba(8, 145, 178, 0.08)',
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
