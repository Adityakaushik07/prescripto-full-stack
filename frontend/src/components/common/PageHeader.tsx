import { Box, Typography, Button } from '@mui/material';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: ReactNode;
};

/** Page title + optional primary action button shown to its right. */
export const PageHeader = ({
  title,
  actionLabel,
  onAction,
  actionIcon,
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Typography variant="h1">{title}</Typography>
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          startIcon={actionIcon}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};