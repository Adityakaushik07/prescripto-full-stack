import { Skeleton, Stack, Box } from '@mui/material';

type LoadingSkeletonProps = {
  variant?: 'card' | 'table' | 'page';
};

const CardSkeleton = () => (
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap>
    {[1, 2, 3, 4].map((i) => (
      <Skeleton
        key={i}
        variant="rounded"
        sx={{ borderRadius: 3, flex: 1, height: 120 }}
      />
    ))}
  </Stack>
);

const TableSkeleton = () => (
  <Box>
    <Skeleton variant="rounded" sx={{ height: 56, mb: 1.5, borderRadius: 2 }} />
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Skeleton
        key={i}
        variant="rounded"
        sx={{ height: 64, mb: 0.75, borderRadius: 2 }}
      />
    ))}
  </Box>
);

const PageSkeleton = () => (
  <Stack spacing={2}>
    <Skeleton variant="text" sx={{ fontSize: '1.75rem', maxWidth: 320 }} />
    <Skeleton variant="rounded" sx={{ height: 200, borderRadius: 3 }} />
    <Skeleton variant="rounded" sx={{ height: 200, borderRadius: 3 }} />
  </Stack>
);

/** Reusable loading placeholder for card grids, tables, and full pages. */
export const LoadingSkeleton = ({ variant = 'page' }: LoadingSkeletonProps) => {
  switch (variant) {
    case 'card':
      return <CardSkeleton />;
    case 'table':
      return <TableSkeleton />;
    default:
      return <PageSkeleton />;
  }
};