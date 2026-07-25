import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Route guard: if there is no auth token, bounce the user to /login.
 * Otherwise render nested routes via <Outlet />. Used as a layout route
 * wrapping all authenticated pages.
 */
export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};