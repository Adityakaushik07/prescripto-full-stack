import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { MonitorHeart as MonitorHeartIcon } from '@mui/icons-material';
import { SLATE_600, SLATE_900, TEAL_600, TEAL_700 } from './landingTheme';

/** Top bar: brand left, section links center, auth actions right. */
export const LandingNav = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MonitorHeartIcon sx={{ color: TEAL_600, fontSize: 28 }} />
        <Typography
          sx={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: SLATE_900,
            letterSpacing: '-0.02em',
          }}
        >
          CareHub
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 4,
        }}
      >
        {['Product', 'Features', 'Pricing'].map((label) => (
          <Typography
            key={label}
            component="a"
            href={label === 'Features' ? '#features' : '#how-it-works'}
            sx={{
              color: SLATE_600,
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: SLATE_900 },
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Button
          component={RouterLink}
          to="/login"
          sx={{ color: SLATE_600, fontWeight: 600 }}
        >
          Log in
        </Button>
        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          sx={{
            bgcolor: TEAL_600,
            boxShadow: 'none',
            px: 2.5,
            '&:hover': { bgcolor: TEAL_700, boxShadow: 'none' },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  </Container>
);
