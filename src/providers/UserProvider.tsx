'use client';

import { createUserStore, type UserStore } from '@/stores/user';
import type { Nullable } from '@/types/misc';
import { assert } from '@/utils/assert';
import React, { type PropsWithChildren } from 'react';
import { useStore } from 'zustand';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext =
  React.createContext<Nullable<UserStoreApi>>(null);

export const UserStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const storeRef = React.useRef<UserStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = React.useContext(UserStoreContext);
  assert(
    userStoreContext,
    'useUserStore must be used within <UserStoreProvider />',
  );

  return useStore(userStoreContext, selector);
};

export const useUser = () => {
  return useUserStore((store) => store);
};
