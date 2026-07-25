import { createTheme } from '@mui/material/styles';

// Shared config applied to both light and dark themes
const sharedConfig = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const lightTheme = createTheme({
  palette: { mode: 'light' },
  ...sharedConfig,
});

export const darkTheme = createTheme({
  palette: { mode: 'dark' },
  ...sharedConfig,
});