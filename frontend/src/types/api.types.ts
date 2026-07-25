import type { AuthUser } from './auth.types';

/**
 * Standard envelope every backend endpoint returns. `data` is optional because
 * error responses omit it; `token`/`user` only appear on the auth endpoints,
 * which return them at the top level instead of inside `data`.
 */
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: AuthUser;
};