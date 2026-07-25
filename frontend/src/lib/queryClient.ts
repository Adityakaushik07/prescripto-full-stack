import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid refetching on window refocus — it causes unnecessary API calls
      refetchOnWindowFocus: false,
      // Treat cached data as fresh for 1 minute before React Query refetches
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});