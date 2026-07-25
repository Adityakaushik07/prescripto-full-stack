import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Typography,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { AuthLayout } from './AuthLayout';
import { registerSchema, type RegisterFormData } from './authSchema';
import { register as registerUser } from './authService';
import { getApiErrorMessage } from '../../lib/api';
import { getDashboardPath, useAuthStore } from '../../store/authStore';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const loginUser = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      // Registration is patient-only — the backend assigns the role
      const { token, user } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
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
        Create account
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          mt: 0.5,
          mb: 3,
        }}
      >
        Sign up to book your first appointment
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Full name"
          placeholder="John Doe"
          fullWidth
          size="medium"
          autoComplete="name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ mb: 2 }}
        />

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
          placeholder="Min. 8 characters"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="medium"
          autoComplete="new-password"
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
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirm password"
          placeholder="Re-enter your password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="medium"
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ mb: 3 }}
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
          Create account
        </Button>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ color: 'primary.main', fontWeight: 600 }}
          >
            Sign in
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
