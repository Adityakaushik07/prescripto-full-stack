import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/** 404 fallback — neutral copy, single CTA back to home. */
export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h1">Page not found</Typography>
      <Typography color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to home
      </Button>
    </Box>
  );
};