import { type User } from '@/types/user';
import { createStore } from 'zustand/vanilla';

type UserState = {
  user: User;
};

type UserActions = {
  setUser: (newUser: User) => void;
  clearUserStore: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: {
    name: '',
  },
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    user: initState.user,
    setUser(newUser) {
      set({ user: newUser });
    },
    clearUserStore() {
      set({ user: defaultInitState.user });
    },
  }));
};
