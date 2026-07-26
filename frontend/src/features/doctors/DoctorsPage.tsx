import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { MedicalServicesOutlined as MedicalServicesIcon } from '@mui/icons-material';
import { useDoctors } from './useDoctors';
import { DoctorCard } from './DoctorCard';
import { DoctorSearch, SpecialityChips } from './DoctorFilters';
import { EmptyState } from '../../components/common/EmptyState';
import type { Doctor } from '../../types/doctor.types';

const PAGE_SIZE = 6;

const matchesFilters = (
  doctor: Doctor,
  search: string,
  speciality: string,
): boolean => {
  if (speciality && doctor.speciality !== speciality) return false;
  if (search) {
    const term = search.toLowerCase();
    const haystack = `${doctor.name} ${doctor.speciality}`.toLowerCase();
    if (!haystack.includes(term)) return false;
  }
  return true;
};

const RowSkeleton = () => (
  <Skeleton variant="rounded" sx={{ height: 104, borderRadius: 4 }} />
);

/** Doctors directory — search, speciality filter chips, paginated row cards. */
export const DoctorsPage = () => {
  const { data: doctors, isLoading, isError, error, refetch } = useDoctors();

  // Speciality lives in the URL (/doctors?speciality=...) per PRD US-2.2;
  // search is local state since it changes too often for the address bar
  const [searchParams, setSearchParams] = useSearchParams();
  const speciality = searchParams.get('speciality') ?? '';
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSpecialityChange = (next: string) => {
    setPage(1);
    setSearchParams(next ? { speciality: next } : {});
  };

  const handleSearchChange = (next: string) => {
    setPage(1);
    setSearch(next);
  };

  const filteredDoctors = useMemo(
    () =>
      (doctors ?? []).filter((doctor) =>
        matchesFilters(doctor, search.trim(), speciality),
      ),
    [doctors, search, speciality],
  );

  const pageCount = Math.ceil(filteredDoctors.length / PAGE_SIZE);
  const visibleDoctors = filteredDoctors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      {/* Header row: title left, rounded search right (mockup layout) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography variant="h1">Find a Doctor</Typography>
        <DoctorSearch value={search} onChange={handleSearchChange} />
      </Box>

      <SpecialityChips value={speciality} onChange={handleSpecialityChange} />

      <Box sx={{ mt: 3 }}>
        {isLoading && (
          <Stack spacing={1.5}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RowSkeleton key={i} />
            ))}
          </Stack>
        )}

        {isError && (
          <Box sx={{ textAlign: 'center' }}>
            <EmptyState
              text={error.message || 'Could not load doctors'}
              icon={<MedicalServicesIcon sx={{ fontSize: 48 }} />}
              sx={{ pb: 2 }}
            />
            <Button variant="outlined" onClick={() => refetch()}>
              Retry
            </Button>
          </Box>
        )}

        {!isLoading && !isError && visibleDoctors.length === 0 && (
          <EmptyState
            text="No doctors found"
            icon={<MedicalServicesIcon sx={{ fontSize: 48 }} />}
          />
        )}

        {!isLoading && !isError && visibleDoctors.length > 0 && (
          <Stack spacing={1.5}>
            {visibleDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                index={(page - 1) * PAGE_SIZE + index}
              />
            ))}
          </Stack>
        )}

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, nextPage) => setPage(nextPage)}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
