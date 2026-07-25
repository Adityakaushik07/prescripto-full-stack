import { createTheme } from '@mui/material/styles';

// CareHub brand colors — teal primary, slate neutrals. See docs/DESIGN.md
const TEAL_LIGHT = {
  main: '#0891B2',
  dark: '#0E7490',
  light: '#ECFEFF',
  contrastText: '#FFFFFF',
};
const TEAL_DARK = {
  main: '#06B6D4',
  dark: '#0891B2',
  light: '#164E63',
  contrastText: '#0F172A',
};

// Typography config from docs/DESIGN.md
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontWeight: 700,
    fontSize: '1.75rem', // 28px
  },
  h2: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontWeight: 600,
    fontSize: '1.375rem', // 22px
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.125rem', // 18px
  },
  body1: {
    fontSize: '0.938rem', // 15px
  },
  body2: {
    fontSize: '0.813rem', // 13px
  },
  button: {
    textTransform: 'none' as const,
    fontWeight: 600,
    fontSize: '0.875rem', // 14px
  },
};

// Component overrides shared by both themes. Card uses 1px border + no shadow;
// Button uses 8px radius; TextField has a teal focus ring instead of default blue.
const getOverrides = (isDark: boolean) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor: isDark ? '#334155 #0F172A' : '#CBD5E1 transparent',
      },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: `1px solid ${isDark ? '#334155' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none' as const,
      },
    },
  },
  MuiTextField: {
    defaultProps: { size: 'small' as const },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: isDark ? '#06B6D4' : '#0891B2',
            borderWidth: 1,
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: 12 },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 8, fontWeight: 500 },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: TEAL_LIGHT,
    secondary: { main: '#7C3AED' },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    divider: '#E2E8F0',
    success: { main: '#059669' },
    warning: { main: '#D97706' },
    error: { main: '#DC2626' },
  },
  shape: { borderRadius: 8 },
  typography,
  components: getOverrides(false),
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: TEAL_DARK,
    secondary: { main: '#7C3AED' },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: '#334155',
    success: { main: '#059669' },
    warning: { main: '#D97706' },
    error: { main: '#DC2626' },
  },
  shape: { borderRadius: 8 },
  typography,
  components: getOverrides(true),
});