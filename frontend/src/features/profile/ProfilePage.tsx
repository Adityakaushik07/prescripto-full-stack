import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  PersonOutlined as PersonIcon,
} from '@mui/icons-material';
import { getProfile, updateProfile } from './profileService';
import { toFormValues } from './profileUtils';
import { ProfileView } from './ProfileView';
import { ProfileEditForm } from './ProfileEditForm';
import { EmptyState } from '../../components/common/EmptyState';
import { PageHeader } from '../../components/common/PageHeader';
import { useToast } from '../../components/common/Toast';
import { getApiErrorMessage } from '../../lib/api';
import type { ProfileFormData } from './profileSchema';

/** Patient profile with view/edit toggle and avatar upload (PRD US-4.1). */
export const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { showToast, toastElement } = useToast();

  const { data: profile, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast('Profile updated', 'success');
      handleExitEdit();
    },
    onError: (updateError) => {
      showToast(getApiErrorMessage(updateError), 'error');
    },
  });

  // Free the object URL so previews don't leak memory
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleExitEdit = () => {
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (formData: ProfileFormData) => {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('phone', formData.phone);
    payload.append('gender', formData.gender);
    payload.append('dob', formData.dob);
    // The backend JSON.parses this field, so always send a valid string
    payload.append(
      'address',
      JSON.stringify({
        line1: formData.addressLine1,
        line2: formData.addressLine2,
      }),
    );
    if (imageFile) payload.append('image', imageFile);
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 640, mx: 'auto' }}>
        <PageHeader title="My Profile" />
        <Skeleton variant="rounded" sx={{ height: 420, borderRadius: 3 }} />
      </Box>
    );
  }

  if (isError || !profile) {
    return (
      <Box sx={{ maxWidth: 640, mx: 'auto' }}>
        <PageHeader title="My Profile" />
        <Box sx={{ textAlign: 'center' }}>
          <EmptyState
            text={
              isError
                ? error.message || 'Could not load profile'
                : 'Profile not found'
            }
            icon={<PersonIcon sx={{ fontSize: 48 }} />}
            sx={{ pb: 2 }}
          />
          <Button variant="outlined" onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      </Box>
    );
  }

  const avatarSrc = imagePreview ?? profile.image;

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <PageHeader
        title="My Profile"
        actionLabel={isEditing ? undefined : 'Edit Profile'}
        onAction={isEditing ? undefined : () => setIsEditing(true)}
        actionIcon={<EditIcon />}
      />

      <Card sx={{ p: { xs: 2.5, sm: 4 } }}>
        {/* Avatar — clicking it in edit mode opens the file picker */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              isEditing ? (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 16 }} />
                </Box>
              ) : null
            }
          >
            <Avatar
              src={avatarSrc}
              alt={profile.name}
              onClick={() => isEditing && fileInputRef.current?.click()}
              sx={{
                width: 110,
                height: 110,
                border: '3px solid',
                borderColor: 'primary.light',
                cursor: isEditing ? 'pointer' : 'default',
              }}
            />
          </Badge>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImagePick}
          />
        </Box>

        {isEditing ? (
          <ProfileEditForm
            defaultValues={toFormValues(profile)}
            isSaving={updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={handleExitEdit}
          />
        ) : (
          <ProfileView profile={profile} />
        )}
      </Card>

      {toastElement}
    </Box>
  );
};
