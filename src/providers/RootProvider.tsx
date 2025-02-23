'use client';

import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { UserStoreProvider } from '@/providers/UserProvider';
import React from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {};

const RootProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <>
      <ThemeProvider bgColor="var(--color-white)">
        <UserStoreProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </UserStoreProvider>
      </ThemeProvider>

      {/**
       * TODO: Customize the toast style
       * https://react-hot-toast.com/docs/toast-bar
       */}
      <Toaster position="top-right" />
    </>
  );
};

export default RootProvider;
