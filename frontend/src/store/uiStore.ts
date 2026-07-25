import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type UiState = {
  themeMode: ThemeMode;
  // Controls the temporary mobile drawer only — the desktop sidebar is a
  // permanent 72px collapsed rail, so this flag has no effect on md+ screens.
  sidebarOpen: boolean;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  // Default to light; stored-preference persistence lands in the polish step
  themeMode: 'light',
  sidebarOpen: false,

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));