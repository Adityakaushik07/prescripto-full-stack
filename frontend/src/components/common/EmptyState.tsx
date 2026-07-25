import { Inbox } from '@mui/icons-material';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

type EmptyStateProps = {
  text: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
};

/** "No data" placeholder — muted icon + short message, centered. */
export const EmptyState = ({ text, icon, sx }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
        color: 'text.secondary',
        ...sx,
      }}
    >
      <Box sx={{ color: 'text.disabled', mb: 1.5 }}>
        {icon ?? <Inbox sx={{ fontSize: 48 }} />}
      </Box>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};