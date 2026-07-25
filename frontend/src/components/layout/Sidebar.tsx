import {
  List,
  ListItemButton,
  Box,
  Tooltip,
  Avatar,
  Divider,
  Drawer,
} from '@mui/material';
import {
  SpaceDashboard as DashboardIcon,
  MedicalServices as DoctorsIcon,
  CalendarMonth as AppointmentsIcon,
  Person as ProfileIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import type { UserRole } from '../../types/auth.types';

const SIDEBAR_WIDTH = 72;
const SIDEBAR_BG = '#0C1222';

type NavItem = {
  label: string;
  icon: ReactElement;
  path: string;
  roles: UserRole[];
  match: string[];
};

// Role-based nav — see sidebar menu table in docs/DESIGN.md.
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    path: '/home',
    roles: ['patient'],
    match: ['/home'],
  },
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard/admin',
    roles: ['admin'],
    match: ['/dashboard/admin', '/dashboard/admin/*'],
  },
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard/doctor',
    roles: ['doctor'],
    match: ['/dashboard/doctor', '/dashboard/doctor/*'],
  },
  {
    label: 'Doctors',
    icon: <DoctorsIcon />,
    path: '/doctors',
    roles: ['patient', 'admin'],
    match: ['/doctors', '/doctors/:doctorId'],
  },
  {
    label: 'Appointments',
    icon: <AppointmentsIcon />,
    path: '/my-appointments',
    roles: ['patient'],
    match: ['/my-appointments', '/verify'],
  },
  {
    label: 'Appointments',
    icon: <AppointmentsIcon />,
    path: '/dashboard/doctor/appointments',
    roles: ['doctor'],
    match: ['/dashboard/doctor/appointments'],
  },
  {
    label: 'Appointments',
    icon: <AppointmentsIcon />,
    path: '/dashboard/admin/appointments',
    roles: ['admin'],
    match: ['/dashboard/admin/appointments'],
  },
  {
    label: 'Profile',
    icon: <ProfileIcon />,
    path: '/profile',
    roles: ['patient'],
    match: ['/profile'],
  },
  {
    label: 'Profile',
    icon: <ProfileIcon />,
    path: '/dashboard/doctor/profile',
    roles: ['doctor'],
    match: ['/dashboard/doctor/profile'],
  },
];

const isActive = (item: NavItem, pathname: string): boolean => {
  return item.match.some((pattern) => matchPath(pattern, pathname) !== null);
};

const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = NAV_ITEMS.filter((item) =>
    user ? item.roles.includes(user.role) : false,
  );

  const initials = user
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        bgcolor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1.5,
      }}
    >
      {/* Brand mark — tiny teal "CH" */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(8,145,178,0.15)',
          color: '#06B6D4',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
          fontSize: 16,
          mb: 2,
        }}
      >
        CH
      </Box>

      <List sx={{ width: '100%', p: 0, flex: 1 }}>
        {items.map((item) => {
          const active = isActive(item, pathname);
          return (
            <ListItemButton
              key={item.label + item.path}
              onClick={() => {
                navigate(item.path);
                onItemClick?.();
              }}
              sx={{
                justifyContent: 'center',
                py: 1.25,
                my: 0.25,
                borderRadius: 0,
                // Active item: teal icon + soft teal glow + 3px teal left accent
                borderLeft: active
                  ? '3px solid #0891B2'
                  : '3px solid transparent',
                bgcolor: active ? 'rgba(8,145,178,0.15)' : 'transparent',
                color: active ? '#06B6D4' : '#94A3B8',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: 'rgba(8,145,178,0.08)',
                  color: '#06B6D4',
                },
              }}
            >
              <Tooltip title={item.label} placement="right">
                {item.icon}
              </Tooltip>
            </ListItemButton>
          );
        })}
      </List>

      <Divider
        sx={{ width: '60%', borderColor: 'rgba(255,255,255,0.08)', my: 1 }}
      />

      <Tooltip title={user?.name ?? 'Account'} placement="right">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'rgba(8,145,178,0.2)',
            color: '#06B6D4',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {initials}
        </Avatar>
      </Tooltip>
    </Box>
  );
};

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Permanent collapsed rail on md+ screens */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          bgcolor: SIDEBAR_BG,
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <SidebarContent />
      </Box>

      {/* Temporary drawer on mobile — opened by the navbar hamburger */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            bgcolor: SIDEBAR_BG,
            border: 'none',
          },
        }}
      >
        <SidebarContent onItemClick={() => setSidebarOpen(false)} />
      </Drawer>
    </>
  );
};

export { SIDEBAR_WIDTH };