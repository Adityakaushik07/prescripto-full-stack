import { useState, type ReactElement } from 'react';
import { Alert, Snackbar } from '@mui/material';

type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

type ToastState = {
  message: string;
  severity: ToastSeverity;
} | null;

/**
 * Lightweight toast helper — returns a `showToast` trigger and the
 * `toastElement` to render once at the page root. Used by patient pages
 * instead of duplicating Snackbar + Alert boilerplate everywhere.
 */
export const useToast = () => {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (message: string, severity: ToastSeverity = 'info') => {
    setToast({ message, severity });
  };

  const toastElement: ReactElement = (
    <Snackbar
      open={!!toast}
      autoHideDuration={4000}
      onClose={() => setToast(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={toast?.severity ?? 'info'}
        variant="filled"
        onClose={() => setToast(null)}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  );

  return { showToast, toastElement };
};
