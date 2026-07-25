import { Navigate, Outlet } from 'react-router-dom';
import { getDashboardPath, useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/auth.types';

type RoleRouteProps = {
  allowedRoles: UserRole[];
};

/**
 * Route guard: only lets users whose role is in `allowedRoles` through.
 * Wrong role → bounced to their own role-appropriate dashboard (PRD US-1.4).
 * Used as a layout route wrapping role-specific routes (admin/doctor).
 */
export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }
  return <Outlet />;
};