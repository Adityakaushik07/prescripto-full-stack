import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type UiState = {
  themeMode: ThemeMode;
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  // Default to light; we'll add stored-preference persistence in the polish step
  themeMode: 'light',
  sidebarOpen: true,

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));