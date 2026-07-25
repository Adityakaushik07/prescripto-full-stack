import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/auth.types';

type RoleRouteProps = {
  allowedRoles: UserRole[];
};

/**
 * Route guard: only lets users whose role is in `allowedRoles` through.
 * Otherwise redirects to /home (a safe default for any logged-in user).
 * Used as a layout route wrapping role-specific routes (admin/doctor).
 */
export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};