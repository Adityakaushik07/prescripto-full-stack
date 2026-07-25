import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT to every request so protected routes don't need manual headers
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A 401 means the token is missing or expired — log out and force re-login.
// Auth endpoints (login/register) are exempt: their 401 just means "wrong
// credentials", and the page must stay put so it can show the error toast.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthRequest) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

/**
 * Pulls a human-readable message out of any thrown error. Prefers the
 * backend's `message` field (our API always sends one on errors).
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const serverMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return serverMessage ?? error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};