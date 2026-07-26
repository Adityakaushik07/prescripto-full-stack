import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { profileSchema, type ProfileFormData } from './profileSchema';

type ProfileEditFormProps = {
  defaultValues: ProfileFormData;
  isSaving: boolean;
  onSubmit: (formData: ProfileFormData) => void;
  onCancel: () => void;
};

/**
 * Edit mode of the profile page (PRD US-4.1). Zod validates on submit;
 * `defaultValues` are re-applied whenever the user re-enters edit mode.
 */
export const ProfileEditForm = ({
  defaultValues,
  isSaving,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  // Entering edit mode with fresh profile data should replace stale fields
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Full Name"
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Phone"
          fullWidth
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          label="Address Line 1"
          fullWidth
          {...register('addressLine1')}
          error={!!errors.addressLine1}
          helperText={errors.addressLine1?.message}
        />
        <TextField
          label="Address Line 2"
          fullWidth
          {...register('addressLine2')}
          error={!!errors.addressLine2}
          helperText={errors.addressLine2?.message}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Gender"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              {['Male', 'Female', 'Other'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('dob')}
          error={!!errors.dob}
          helperText={errors.dob?.message}
        />
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          loading={isSaving}
          sx={{ px: 4 }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
