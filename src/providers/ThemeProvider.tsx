'use client';

import {
  createThemeStore,
  type ThemeState,
  type ThemeStore,
} from '@/stores/theme';
import { type Nullable } from '@/types/misc';
import { assert } from '@/utils/assert';
import React, { type PropsWithChildren } from 'react';
import { useStore } from 'zustand';

export type ThemeStoreApi = ReturnType<typeof createThemeStore>;

export const ThemeStoreContext =
  React.createContext<Nullable<ThemeStoreApi>>(null);

type Props = Pick<ThemeState, 'bgColor'>;

export const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...initState
}) => {
  const storeRef = React.useRef<ThemeStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore(initState);
  }

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      <ThemeController>{children}</ThemeController>
    </ThemeStoreContext.Provider>
  );
};

const ThemeController: React.FC<PropsWithChildren> = ({ children }) => {
  const { bgColor } = useTheme();

  return (
    <>
      {children}

      <style>
        {`
          body {
            background-color: ${bgColor};
          }
        `}
      </style>
    </>
  );
};

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = React.useContext(ThemeStoreContext);
  assert(
    themeStoreContext,
    'useThemeStore must be used within <ThemeProvider />',
  );

  return useStore(themeStoreContext, selector);
};

export const useTheme = () => {
  const themeStore = useThemeStore((store) => store);

  return themeStore;
};
