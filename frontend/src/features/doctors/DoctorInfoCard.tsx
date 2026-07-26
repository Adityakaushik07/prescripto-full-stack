import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import { Verified as VerifiedIcon } from '@mui/icons-material';
import { CURRENCY_SYMBOL } from '../../lib/constants';
import type { Doctor } from '../../types/doctor.types';

type DoctorInfoCardProps = {
  doctor: Doctor;
};

/** Large photo + full details shown at the top of the doctor detail page. */
export const DoctorInfoCard = ({ doctor }: DoctorInfoCardProps) => (
  <Card
    sx={{
      p: { xs: 2, sm: 3 },
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 3,
    }}
  >
    <Box
      component="img"
      src={doctor.image}
      alt={doctor.name}
      sx={{
        width: { xs: '100%', sm: 200 },
        height: { xs: 240, sm: 200 },
        objectFit: 'cover',
        objectPosition: 'top',
        borderRadius: 3,
        bgcolor: 'primary.light',
        flexShrink: 0,
      }}
    />

    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>
          {doctor.name}
        </Typography>
        <VerifiedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
      </Box>

      <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
        {doctor.degree} · {doctor.speciality}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} useFlexGap>
        <Chip
          label={doctor.experience}
          size="small"
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.dark',
            fontWeight: 600,
          }}
        />
        <Chip
          size="small"
          label={doctor.available ? 'Available' : 'Unavailable'}
          sx={{
            bgcolor: doctor.available ? '#D1FAE5' : '#FEE2E2',
            color: doctor.available ? '#065F46' : '#991B1B',
            fontWeight: 600,
          }}
        />
      </Stack>

      <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mt: 2 }}>
        {doctor.about}
      </Typography>

      <Typography sx={{ mt: 2, fontWeight: 700, fontSize: '1.1rem' }}>
        {CURRENCY_SYMBOL}
        {doctor.fees}
        <Typography
          component="span"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: '0.8rem',
            ml: 0.5,
          }}
        >
          per consultation
        </Typography>
      </Typography>
    </Box>
  </Card>
);
