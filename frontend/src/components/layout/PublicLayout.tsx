import { Outlet } from 'react-router-dom';

/**
 * Bare layout for public pages (landing, login, register). No sidebar, no
 * navbar — the page itself owns the entire viewport.
 */
export const PublicLayout = () => {
  return <Outlet />;
};