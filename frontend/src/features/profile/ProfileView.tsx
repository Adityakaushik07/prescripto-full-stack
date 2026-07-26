import { Box, Typography } from '@mui/material';
import { unsetToEmpty } from './profileUtils';
import type { PatientProfile } from '../../types/profile.types';

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 2,
      py: 1.25,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-of-type': { borderBottom: 'none' },
    }}
  >
    <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
      {label}
    </Typography>
    <Typography
      sx={{ fontWeight: 500, fontSize: '0.875rem', textAlign: 'right' }}
    >
      {value || '—'}
    </Typography>
  </Box>
);

type ProfileViewProps = {
  profile: PatientProfile;
};

/** Read-only profile display (PRD US-4.1 display mode). */
export const ProfileView = ({ profile }: ProfileViewProps) => {
  const address = [profile.address?.line1, profile.address?.line2]
    .filter(Boolean)
    .join(', ');

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h2">{profile.name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{profile.email}</Typography>
      </Box>
      <DetailRow label="Phone" value={unsetToEmpty(profile.phone)} />
      <DetailRow label="Address" value={address} />
      <DetailRow label="Gender" value={unsetToEmpty(profile.gender)} />
      <DetailRow label="Date of Birth" value={unsetToEmpty(profile.dob)} />
    </Box>
  );
};
