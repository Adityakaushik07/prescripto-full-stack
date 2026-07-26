import { Navigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { LandingNav } from './LandingNav';
import { HeroSection } from './HeroSection';
import { FeaturesSection, HowItWorksSection } from './LandingSections';
import { getDashboardPath, useAuthStore } from '../../store/authStore';
import { SLATE_200, SLATE_500, SLATE_900 } from './landingTheme';

const LandingFooter = () => (
  <Box sx={{ borderTop: `1px solid ${SLATE_200}` }}>
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          py: 3,
        }}
      >
        <Typography sx={{ color: SLATE_500, fontSize: '0.85rem' }}>
          © 2026 CareHub. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['Product', 'Features', 'Pricing'].map((label) => (
            <Typography
              key={label}
              component="a"
              href={label === 'Features' ? '#features' : '#how-it-works'}
              sx={{
                color: SLATE_500,
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: SLATE_900 },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

/**
 * Public landing page at `/` (PRD US-7.1). Logged-in users are sent to their
 * role's home instead — patients see the doctor listing directly.
 */
export const LandingPage = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (token && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LandingFooter />
    </Box>
  );
};
