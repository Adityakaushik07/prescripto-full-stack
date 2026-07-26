import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Link, Skeleton, Stack, Typography } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MedicalServicesOutlined as MedicalServicesIcon,
} from '@mui/icons-material';
import { useDoctor, useDoctors } from './useDoctors';
import { DoctorCard } from './DoctorCard';
import { DoctorInfoCard } from './DoctorInfoCard';
import { SlotPicker, type SlotSelection } from './SlotPicker';
import { EmptyState } from '../../components/common/EmptyState';
import { useToast } from '../../components/common/Toast';
import { useBookAppointment } from '../appointments/useAppointments';
import { getApiErrorMessage } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

const MAX_RELATED = 4;

/** Doctor profile + slot booking (PRD US-2.4, US-3.1, US-3.2). */
export const DoctorDetailPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const { showToast, toastElement } = useToast();

  const { data: doctor, isLoading, isError, error } = useDoctor(doctorId);
  const { data: allDoctors } = useDoctors();
  const bookMutation = useBookAppointment();

  const [selectedSlot, setSelectedSlot] = useState<SlotSelection | null>(null);

  // Related doctors: same speciality, excluding this one, max 4 (PRD US-2.4)
  const relatedDoctors = (allDoctors ?? [])
    .filter(
      (other) =>
        other._id !== doctorId && other.speciality === doctor?.speciality,
    )
    .slice(0, MAX_RELATED);

  const handleBook = () => {
    if (!token) {
      showToast('Please log in to book an appointment', 'warning');
      navigate('/login');
      return;
    }
    if (!selectedSlot || !selectedSlot.slotTime) {
      showToast('Please select a time slot', 'warning');
      return;
    }
    bookMutation.mutate(
      {
        docId: doctorId!,
        slotDate: selectedSlot.slotDate,
        slotTime: selectedSlot.slotTime,
      },
      {
        onSuccess: () => {
          // The toast lives on the next page — the redirect unmounts this one
          navigate('/my-appointments', { state: { booked: true } });
        },
        onError: (bookError) => {
          showToast(getApiErrorMessage(bookError), 'error');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        <Skeleton variant="rounded" sx={{ height: 260, borderRadius: 3 }} />
        <Skeleton
          variant="rounded"
          sx={{ height: 300, borderRadius: 3, mt: 2 }}
        />
      </Box>
    );
  }

  if (isError) {
    return (
      <EmptyState
        text={error.message || 'Could not load doctor'}
        icon={<MedicalServicesIcon sx={{ fontSize: 48 }} />}
      />
    );
  }

  if (!doctor) {
    return (
      <EmptyState
        text="Doctor not found"
        icon={<MedicalServicesIcon sx={{ fontSize: 48 }} />}
      />
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Link
        component={RouterLink}
        to="/doctors"
        underline="hover"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.secondary',
          fontSize: '0.875rem',
          mb: 2,
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to doctors
      </Link>

      <DoctorInfoCard doctor={doctor} />

      {/* Slot booking */}
      <Card sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <SlotPicker
          bookedSlots={doctor.slots_booked ?? {}}
          selected={selectedSlot}
          onSelect={setSelectedSlot}
        />
        <Button
          variant="contained"
          onClick={handleBook}
          loading={bookMutation.isPending}
          disabled={!doctor.available}
          sx={{ mt: 3, px: 4, py: 1.25, borderRadius: '10px' }}
        >
          Book Appointment
        </Button>
      </Card>

      {/* Related doctors */}
      {relatedDoctors.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Related Doctors
          </Typography>
          <Stack spacing={1.5}>
            {relatedDoctors.map((related, index) => (
              <DoctorCard key={related._id} doctor={related} index={index} />
            ))}
          </Stack>
        </Box>
      )}

      {toastElement}
    </Box>
  );
};
