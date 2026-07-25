import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, SIDEBAR_WIDTH } from './Sidebar';
import { Navbar } from './Navbar';

const NAVBAR_HEIGHT = 64;

/**
 * App shell: permanent 72px collapsed sidebar rail on the left (mobile uses a
 * temporary drawer), a fixed navbar on top, and a scrollable off-white content
 * area that renders the matched route via <Outlet />.
 */
export const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F7F8FA' }}>
      <Sidebar />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // Account for the fixed navbar and the fixed sidebar on md+
          mt: `${NAVBAR_HEIGHT}px`,
          ml: { md: `${SIDEBAR_WIDTH}px` },
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          p: { xs: 2, md: 4 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};