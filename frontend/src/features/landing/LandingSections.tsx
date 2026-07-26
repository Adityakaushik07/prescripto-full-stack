import { Box, Container, Typography } from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  VerifiedUser as VerifiedUserIcon,
  Payments as PaymentsIcon,
  Insights as InsightsIcon,
} from '@mui/icons-material';
import {
  SLATE_200,
  SLATE_500,
  SLATE_900,
  TEAL_50,
  TEAL_600,
} from './landingTheme';

const FEATURES = [
  {
    icon: <CalendarIcon />,
    title: 'Book Appointments',
    description: 'Pick a slot and confirm in seconds — no phone calls needed.',
  },
  {
    icon: <VerifiedUserIcon />,
    title: 'Trusted Doctors',
    description: 'Every doctor is verified, with experience and fees upfront.',
  },
  {
    icon: <PaymentsIcon />,
    title: 'Online Payment',
    description: 'Pay securely online with Stripe and skip the clinic queue.',
  },
  {
    icon: <InsightsIcon />,
    title: 'Analytics',
    description: 'Clinics track appointments and revenue from one dashboard.',
  },
];

/** Feature cards required by PRD US-7.1 — 4 across on desktop. */
export const FeaturesSection = () => (
  <Container maxWidth="lg" id="features" sx={{ py: { xs: 6, md: 9 } }}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {FEATURES.map((feature) => (
        <Box
          key={feature.title}
          sx={{
            bgcolor: '#FFFFFF',
            border: `1px solid ${SLATE_200}`,
            borderRadius: '16px',
            p: 3,
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: TEAL_600,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              bgcolor: TEAL_50,
              color: TEAL_600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            {feature.icon}
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.95rem',
              color: SLATE_900,
              mb: 0.5,
            }}
          >
            {feature.title}
          </Typography>
          <Typography
            sx={{ color: SLATE_500, fontSize: '0.85rem', lineHeight: 1.55 }}
          >
            {feature.description}
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
);

const STEPS = [
  {
    number: '01',
    title: 'Search Doctor',
    description:
      'Filter by speciality and find the right specialist in seconds.',
  },
  {
    number: '02',
    title: 'Pick a Slot',
    description: 'Choose a date and time that fits your schedule.',
  },
  {
    number: '03',
    title: 'Confirm Booking',
    description: 'Book instantly and pay online — all in one place.',
  },
];

/** "Three steps to your appointment" — numbered cards with ghost watermarks. */
export const HowItWorksSection = () => (
  <Box id="how-it-works" sx={{ bgcolor: '#F8FAFC', py: { xs: 6, md: 9 } }}>
    <Container maxWidth="lg">
      <Typography
        sx={{
          textAlign: 'center',
          color: TEAL_600,
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          mb: 1.5,
        }}
      >
        How it works
      </Typography>
      <Typography
        component="h2"
        sx={{
          textAlign: 'center',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          color: SLATE_900,
          letterSpacing: '-0.02em',
          mb: 5,
        }}
      >
        Three steps to your appointment
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {STEPS.map((step) => (
          <Box
            key={step.number}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              bgcolor: '#FFFFFF',
              border: `1px solid ${SLATE_200}`,
              borderRadius: '16px',
              p: 3.5,
            }}
          >
            {/* Ghost watermark number, like the mockup */}
            <Typography
              aria-hidden
              sx={{
                position: 'absolute',
                top: -18,
                right: 8,
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: '6rem',
                color: 'rgba(8, 145, 178, 0.07)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {step.number}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: '2.5rem',
                color: TEAL_600,
                lineHeight: 1,
                mb: 2,
              }}
            >
              {step.number}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.05rem',
                color: SLATE_900,
                mb: 0.75,
              }}
            >
              {step.title}
            </Typography>
            <Typography
              sx={{ color: SLATE_500, fontSize: '0.9rem', lineHeight: 1.55 }}
            >
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);
