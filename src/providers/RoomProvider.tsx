'use client';

import {
  createRoomStore,
  defaultInitState,
  type RoomState,
  type RoomStore,
} from '@/stores/room';
import { type ChatMessage } from '@/types/chat';
import { type Nullable } from '@/types/misc';
import { assert } from '@/utils/assert';
import React, { type PropsWithChildren } from 'react';
import { useStore } from 'zustand';

export type RoomStoreApi = ReturnType<typeof createRoomStore>;

export const RoomStoreContext =
  React.createContext<Nullable<RoomStoreApi>>(null);

type Props = Omit<RoomState, 'messagesByRoom'> & {
  lobbyChatLogs: ChatMessage[];
};

export const RoomProvider: React.FC<PropsWithChildren<Props>> = ({
  id,
  title,
  hostNickname,
  playing,
  currentChatRoom,
  lobbyChatLogs,
  children,
}) => {
  const storeRef = React.useRef<RoomStoreApi>();
  if (!storeRef.current) {
    const initialState = { ...defaultInitState };

    initialState.id = id;
    initialState.title = title;
    initialState.hostNickname = hostNickname;
    initialState.playing = playing;
    initialState.currentChatRoom = currentChatRoom;
    initialState.messagesByRoom[currentChatRoom] = lobbyChatLogs;

    storeRef.current = createRoomStore(initialState);
  }

  return (
    <RoomStoreContext.Provider value={storeRef.current}>
      {children}
    </RoomStoreContext.Provider>
  );
};

export const useRoomStore = <T,>(selector: (store: RoomStore) => T): T => {
  const roomStoreContext = React.useContext(RoomStoreContext);
  assert(roomStoreContext, 'useRoomStore must be used within <RoomProvider />');

  return useStore(roomStoreContext, selector);
};

export const useRoom = () => {
  return useRoomStore((store) => store);
};
