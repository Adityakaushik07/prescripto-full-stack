import { Avatar, Box, Card, IconButton, Typography } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CURRENCY_SYMBOL } from '../../lib/constants';
import type { Doctor } from '../../types/doctor.types';

// Pastel avatar rings cycle per row, like the doctors mockup (teal/violet/amber)
const RING_COLORS = ['#2DD4BF', '#A78BFA', '#FBBF24'];

type DoctorCardProps = {
  doctor: Doctor;
  // Position in the list — picks the avatar ring color
  index?: number;
};

/**
 * Horizontal row card (see docs/mockups/doctors.png): ringed avatar on the
 * left, name + interpunct-separated details in the middle, fee + circular
 * arrow button on the right. Hover shows a teal left-border accent.
 */
export const DoctorCard = ({ doctor, index = 0 }: DoctorCardProps) => {
  const navigate = useNavigate();

  const ringColor = RING_COLORS[index % RING_COLORS.length];
  const details = [doctor.speciality, doctor.degree, doctor.experience].join(
    ' · ',
  );
  const address = [doctor.address?.line1, doctor.address?.line2]
    .filter(Boolean)
    .join(', ');

  const handleClick = () => {
    navigate(`/doctors/${doctor._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2.5 },
        px: { xs: 2, sm: 3 },
        py: 2,
        borderRadius: 4,
        cursor: 'pointer',
        // Transparent left border pre-reserves 3px so hover doesn't shift layout
        borderLeft: '3px solid transparent',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderLeft: '3px solid #0891B2',
          bgcolor: 'rgba(8, 145, 178, 0.04)',
          borderColor: 'rgba(8, 145, 178, 0.35)',
          '& .doctor-arrow': {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          },
        },
      }}
    >
      <Avatar
        src={doctor.image}
        alt={doctor.name}
        sx={{
          width: { xs: 56, sm: 72 },
          height: { xs: 56, sm: 72 },
          border: `3px solid ${ringColor}`,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              color: 'text.primary',
            }}
            noWrap
          >
            {doctor.name}
          </Typography>
          {/* Availability dot — green = available, red = not */}
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              flexShrink: 0,
              bgcolor: doctor.available ? 'success.main' : 'error.main',
            }}
          />
        </Box>
        <Typography
          sx={{ color: 'text.secondary', fontSize: '0.875rem', mt: 0.25 }}
          noWrap
        >
          {details}
        </Typography>
        {address && (
          <Typography
            sx={{ color: 'text.secondary', fontSize: '0.813rem', mt: 0.25 }}
            noWrap
          >
            {address}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 2.5 },
          flexShrink: 0,
        }}
      >
        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            {CURRENCY_SYMBOL}
            {doctor.fees}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            per consultation
          </Typography>
        </Box>
        <IconButton
          className="doctor-arrow"
          aria-label={`View ${doctor.name}`}
          sx={{
            border: '1.5px solid',
            borderColor: 'primary.main',
            color: 'primary.main',
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};
