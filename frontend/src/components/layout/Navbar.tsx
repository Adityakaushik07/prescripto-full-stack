import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Person as PersonIcon,
  CalendarMonth as AppointmentsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

const ROUTE_TITLES: Record<string, string> = {
  '/home': 'Doctors',
  '/doctors': 'Doctors',
  '/my-appointments': 'My Appointments',
  '/profile': 'My Profile',
  '/verify': 'Payment',
  '/dashboard/admin': 'Admin Dashboard',
  '/dashboard/admin/doctors': 'Manage Doctors',
  '/dashboard/admin/doctors/add': 'Add Doctor',
  '/dashboard/admin/appointments': 'All Appointments',
  '/dashboard/doctor': 'Doctor Dashboard',
  '/dashboard/doctor/appointments': 'My Appointments',
  '/dashboard/doctor/profile': 'My Profile',
};

const resolveTitle = (pathname: string): string => {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  // Doctor detail page
  const doctorMatch = matchPathStart(pathname, '/doctors/');
  if (doctorMatch) return 'Doctor Details';
  return 'CareHub';
};

const matchPathStart = (pathname: string, prefix: string): boolean =>
  pathname.startsWith(prefix);

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { themeMode, toggleTheme, setSidebarOpen } = useUiStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const initials = user
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        // 72px collapsed sidebar + 64px navbar height
        width: { md: `calc(100% - 72px)` },
        ml: { md: '72px' },
      }}
    >
      <Toolbar sx={{ minHeight: '64px', px: { xs: 1.5, md: 3 } }}>
        {/* Mobile hamburger — toggles the temporary sidebar drawer */}
        <IconButton
          edge="start"
          onClick={() => setSidebarOpen(true)}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h1"
          sx={{ flexGrow: 1, fontSize: '1.25rem', fontWeight: 700 }}
        >
          {resolveTitle(pathname)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={themeMode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton onClick={toggleTheme}>
              {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={user?.name ?? 'Account'}>
            <IconButton onClick={openMenu} sx={{ p: 0, ml: 0.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {initials}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            slotProps={{
              paper: { sx: { mt: 1, minWidth: 200, borderRadius: 2 } },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                closeMenu();
                navigate('/profile');
              }}
            >
              <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} /> Profile
            </MenuItem>
            {user?.role === 'patient' && (
              <MenuItem
                onClick={() => {
                  closeMenu();
                  navigate('/my-appointments');
                }}
              >
                <AppointmentsIcon sx={{ mr: 1.5, fontSize: 20 }} /> My
                Appointments
              </MenuItem>
            )}
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};