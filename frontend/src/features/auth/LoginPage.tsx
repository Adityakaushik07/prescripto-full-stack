import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { AuthLayout } from './AuthLayout';
import { loginSchema, type LoginFormData } from './authSchema';
import { login } from './authService';
import { getApiErrorMessage } from '../../lib/api';
import { getDashboardPath, useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/auth.types';

export const LoginPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const loginUser = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'patient',
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const { token, user } = await login(formData);
      loginUser(token, user);
      navigate(getDashboardPath(user.role), { replace: true });
    } catch (error: unknown) {
      setErrorMessage(getApiErrorMessage(error));
    }
  };

  // Already logged in? Bounce to the role's dashboard instead of showing the form
  if (token && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return (
    <AuthLayout>
      <Typography
        component="h1"
        sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
          fontSize: '2rem',
          color: 'text.primary',
          textAlign: 'center',
        }}
      >
        Welcome back
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          mt: 0.5,
          mb: 3,
        }}
      >
        Sign in to your account
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email address"
          placeholder="you@example.com"
          fullWidth
          size="medium"
          autoComplete="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          placeholder="••••••••"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="medium"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((visible) => !visible)}
                    edge="end"
                    size="small"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* PRD: link is shown for completeness, the flow itself is out of scope */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
          <Link
            href="#"
            onClick={(event) => event.preventDefault()}
            underline="hover"
            sx={{ color: 'primary.main', fontSize: '0.813rem' }}
          >
            Forgot password?
          </Link>
        </Box>

        {/* Role selector — one role is always selected, so re-clicking the
            active pill (which yields null) is ignored */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              value={field.value}
              exclusive
              fullWidth
              onChange={(_, newRole: UserRole | null) => {
                if (newRole) field.onChange(newRole);
              }}
              sx={{
                mt: 1.5,
                mb: 3,
                p: '4px',
                gap: '4px',
                borderRadius: '999px',
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? '#F1F5F9'
                    : 'rgba(255,255,255,0.08)',
                '& .MuiToggleButton-root': {
                  flex: 1,
                  py: 1,
                  border: 'none',
                  borderRadius: '999px !important',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'rgba(8, 145, 178, 0.08)' },
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                },
              }}
            >
              <ToggleButton value="patient">Patient</ToggleButton>
              <ToggleButton value="doctor">Doctor</ToggleButton>
              <ToggleButton value="admin">Admin</ToggleButton>
            </ToggleButtonGroup>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          loading={isSubmitting}
          sx={{
            py: 1.4,
            mb: 2,
            borderRadius: '10px',
            fontSize: '0.95rem',
            boxShadow: 'none',
          }}
        >
          Sign in
        </Button>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{ color: 'primary.main', fontWeight: 600 }}
          >
            Create one
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};
