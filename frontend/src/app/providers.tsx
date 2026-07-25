import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useUiStore } from '../store/uiStore';
import { lightTheme, darkTheme } from '../lib/theme';
import { queryClient } from '../lib/queryClient';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Wraps the app with every cross-cutting provider (theme, server state, router).
 * Keeping them in one place avoids repeated boilerplate in feature code.
 */
export const Providers = ({ children }: ProvidersProps) => {
  const themeMode = useUiStore((state) => state.themeMode);
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};