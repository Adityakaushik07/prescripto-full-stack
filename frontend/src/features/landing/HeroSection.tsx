import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import {
  PlayCircleOutlined as PlayCircleOutlineIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { BookingPreviewCard } from './BookingPreviewCard';
import {
  SLATE_200,
  SLATE_400,
  SLATE_500,
  SLATE_900,
  TEAL_50,
  TEAL_600,
  TEAL_700,
} from './landingTheme';

const SOCIAL_PROOF = [
  { value: '2,500+', label: 'Appointments monthly', showStar: false },
  { value: '200+', label: 'Verified Doctors', showStar: false },
  { value: '4.9', label: 'Patient rating', showStar: true },
];

/** Left-aligned hero: badge, headline, CTAs, social proof + floating preview. */
export const HeroSection = () => (
  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
    {/* Faint dot-grid texture behind the preview card */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        backgroundImage:
          'radial-gradient(circle, #E2E8F0 1.2px, transparent 1.2px)',
        backgroundSize: '22px 22px',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        maskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        pointerEvents: 'none',
      }}
    />

    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 6, md: 4 },
          py: { xs: 6, md: 10 },
        }}
      >
        {/* Left: copy + CTAs + social proof (~60%) */}
        <Box sx={{ width: { xs: '100%', md: '58%' } }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: TEAL_50,
                borderRadius: '999px',
                px: 1.5,
                py: 0.5,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: TEAL_600,
                }}
              />
              <Typography
                sx={{ color: TEAL_700, fontSize: '0.8rem', fontWeight: 600 }}
              >
                Trusted by 500+ clinics
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: SLATE_900,
                mb: 2.5,
              }}
            >
              Book your next doctor visit in under 30 seconds
            </Typography>

            <Typography
              sx={{
                color: SLATE_500,
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                maxWidth: 480,
                mb: 4,
              }}
            >
              CareHub connects patients with verified doctors instantly.
              Browse, book, and pay — all from one place.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 6 }}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{
                  bgcolor: TEAL_600,
                  boxShadow: 'none',
                  px: 3,
                  py: 1.5,
                  fontSize: '0.95rem',
                  '&:hover': { bgcolor: TEAL_700, boxShadow: 'none' },
                }}
              >
                Start booking — it&apos;s free
              </Button>
              <Button
                variant="outlined"
                startIcon={<PlayCircleOutlineIcon />}
                sx={{
                  borderColor: SLATE_200,
                  color: SLATE_900,
                  px: 3,
                  py: 1.5,
                  fontSize: '0.95rem',
                  '&:hover': { borderColor: SLATE_400, bgcolor: 'transparent' },
                }}
              >
                Watch demo
              </Button>
            </Box>

            {/* Social proof numbers separated by vertical dividers */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2.5, md: 4 },
              }}
            >
              {SOCIAL_PROOF.map((stat, index) => (
                <Box
                  key={stat.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 2.5, md: 4 },
                  }}
                >
                  {index > 0 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ height: 44 }}
                    />
                  )}
                  <Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontWeight: 800,
                          fontSize: '1.5rem',
                          color: TEAL_600,
                          lineHeight: 1.1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      {stat.showStar && (
                        <StarIcon sx={{ color: TEAL_600, fontSize: 22 }} />
                      )}
                    </Box>
                    <Typography
                      sx={{ color: SLATE_500, fontSize: '0.813rem' }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Right: floating rotated preview card (~40%) */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Box
              sx={{
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
                animation: 'float 6s ease-in-out infinite',
              }}
            >
              <BookingPreviewCard />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Container>
  </Box>
);
