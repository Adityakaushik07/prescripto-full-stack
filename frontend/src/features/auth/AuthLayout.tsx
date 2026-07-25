import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { MonitorHeart as MonitorHeartIcon } from '@mui/icons-material';

type AuthLayoutProps = {
  children: ReactNode;
};

// The orb reads as a single "mesh" sphere but is two stacked circles: a
// blurred copy behind for the glow halo, and a crisp one on top whose
// layered radial gradients blend teal -> cyan -> violet like the mockup.
const ORB_GRADIENT = [
  'radial-gradient(circle at 32% 26%, rgba(153, 246, 228, 0.95) 0%, rgba(45, 212, 191, 0.8) 22%, transparent 48%)',
  'radial-gradient(circle at 70% 74%, rgba(139, 92, 246, 0.95) 0%, rgba(109, 40, 217, 0.75) 32%, transparent 62%)',
  'radial-gradient(circle at 50% 45%, rgba(34, 211, 238, 0.95) 0%, rgba(8, 145, 178, 0.9) 55%, rgba(12, 74, 110, 0.95) 100%)',
].join(', ');

/**
 * Split-screen shell for the login/register pages: dark brand panel with the
 * glowing orb on the left, form content on the right. On mobile the panels
 * stack vertically (brand panel on top).
 */
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: 340, md: '100vh' },
          bgcolor: '#080F1E',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 5, md: 0 },
        }}
      >
        {/* Mesh gradient orb */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 160, md: 320 },
            height: { xs: 160, md: 320 },
            flexShrink: 0,
          }}
        >
          {/* Glow halo — a blurred copy of the sphere sitting behind it */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: ORB_GRADIENT,
              filter: 'blur(48px)',
              transform: 'scale(1.2)',
              opacity: 0.75,
            }}
          />
          {/* The sphere itself */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: ORB_GRADIENT,
              boxShadow:
                'inset -20px -28px 64px rgba(76, 29, 149, 0.5), inset 14px 18px 48px rgba(153, 246, 228, 0.28)',
            }}
          />
        </Box>

        {/* Logo + tagline */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: { xs: 3, md: 7 },
          }}
        >
          <MonitorHeartIcon
            sx={{ color: '#2DD4BF', fontSize: { xs: 34, md: 46 } }}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              color: '#F8FAFC',
              letterSpacing: '-0.02em',
            }}
          >
            CareHub
          </Typography>
        </Box>
        <Typography
          sx={{
            color: '#94A3B8',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            mt: 1,
          }}
        >
          Healthcare, simplified.
        </Typography>

        <Typography
          sx={{
            position: 'absolute',
            bottom: 24,
            left: 32,
            color: '#475569',
            fontSize: '0.8rem',
          }}
        >
          © 2026 CareHub
        </Typography>
      </Box>

      {/* Form panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 6 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>{children}</Box>
      </Box>
    </Box>
  );
};
