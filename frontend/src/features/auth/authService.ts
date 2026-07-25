import { api } from '../../lib/api';
import type { ApiResponse } from '../../types/api.types';
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../../types/auth.types';

// Auth endpoints return token + user at the top level of the response
// envelope instead of inside `data`, so they get their own payload type
type AuthPayload = {
  token: string;
  user: AuthUser;
};

export const login = async (
  credentials: LoginRequest,
): Promise<AuthPayload> => {
  const { data } = await api.post<ApiResponse<never>>(
    '/auth/login',
    credentials,
  );
  if (!data.success || !data.token || !data.user) {
    throw new Error(data.message || 'Login failed');
  }
  return { token: data.token, user: data.user };
};

export const register = async (
  details: RegisterRequest,
): Promise<AuthPayload> => {
  const { data } = await api.post<ApiResponse<never>>(
    '/auth/register',
    details,
  );
  if (!data.success || !data.token || !data.user) {
    throw new Error(data.message || 'Registration failed');
  }
  return { token: data.token, user: data.user };
};
