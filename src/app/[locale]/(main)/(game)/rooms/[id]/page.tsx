'use client';

import LoadingIndicator from '@/components/LoadingIndicator';
import Room from '@/containers/room/Room';
import useJoinRoom from '@/hooks/room/useJoinRoom';
import GameModalProvider from '@/providers/GameModalProvider';
import { GameProvider } from '@/providers/GameProvider';
import { RoomProvider } from '@/providers/RoomProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const t = useTranslations('roomRoute');
  const { id } = React.use(params);
  const { isSuccess, isPending, data, joinRoom } = useJoinRoom({
    variables: { id },
  });

  return (
    <>
      {isPending && (
        <LoadingIndicator className="min-h-dvh" label={t('enteringRoom')} />
      )}
      {isSuccess && (
        <RoomProvider
          id={id}
          title={data.name}
          hostNickname={data.owner}
          playing={data.playing}
          lobbyChatLogs={data.chatLogs.map((chatLog) => ({
            ...chatLog,
            type: ChatMessageType.Chat,
          }))}
          currentChatRoom={ChatRoom.Lobby}
        >
          <GameProvider>
            <Room rejoin={handleRejoin} />
            <GameModalProvider />
          </GameProvider>
        </RoomProvider>
      )}
    </>
  );

  function handleRejoin() {
    joinRoom({ id });
  }
};

export default RoomPage;
