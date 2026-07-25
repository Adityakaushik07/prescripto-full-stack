import { create } from 'zustand';
import type { AuthUser } from '../types/auth.types';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize from localStorage so a page refresh keeps the user logged in
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null') as AuthUser | null,

  login: (token, user) => {
    // Persist to localStorage because Zustand state resets on refresh
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));