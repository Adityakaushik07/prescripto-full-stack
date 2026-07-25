// The three roles a user can authenticate as — used by login, routes, and guards
export type UserRole = 'patient' | 'doctor' | 'admin';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginRequest = {
  email: string;
  password: string;
  role: UserRole;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};