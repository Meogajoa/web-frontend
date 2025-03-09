import { createStore } from 'zustand/vanilla';

export type ThemeState = {
  bgColor: string;
};

export type ThemeActions = {
  setBgColor: (newBgColor: string) => void;
  clearThemeStore: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const defaultInitState: ThemeState = {
  bgColor: '',
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    bgColor: initState.bgColor,
    setBgColor(newBgColor) {
      set({ bgColor: newBgColor });
    },
    clearThemeStore() {
      set(defaultInitState);
    },
  }));
};
