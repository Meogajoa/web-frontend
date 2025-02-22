import { Button } from '@/components/Button';
import { RoomChatBar } from '@/components/ChatBar';
import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import RoomMessages from '@/containers/room/RoomMessages';
import RoomUserList from '@/containers/room/RoomUserList';
import useGamePlay from '@/hooks/game/useGamePlay';
import useBodyBgColor from '@/hooks/misc/useBodyBgColor';
import useRoomSystemNotice from '@/hooks/room/useRoomSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { Team } from '@/types/game';
import { cn } from '@/utils/classname';
import React from 'react';

type Props = {
  className?: string;
  rejoin?: () => void;
};

const Room: React.FC<Props> = ({ className, rejoin }) => {
  const { id, isPlaying } = useRoom();
  const { player } = useGame();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);

  useBodyBgColor(
    player.team === Team.Black
      ? 'var(--color-gray-3)'
      : player.team === Team.Red
        ? 'var(--color-white)'
        : 'var(--color-gray-6)',
  );

  useRoomSystemNotice({
    variables: { id },
    onGameStart: handleGameStart,
  });

  useGamePlay({
    enabled: canStartGame,
    onGameEnd: handleGameEnd,
  });

  return (
    <div
      className={cn(
        'bg-gray-6 flex h-full flex-col',
        player.team === Team.Black && 'bg-gray-3',
        player.team === Team.Red && 'bg-red/15',
        className,
      )}
      data-testid="room"
    >
      {!isPlaying ? (
        <>
          <RoomHeaderLobby className="shrink-0" />
          <RoomUserList />
        </>
      ) : (
        <>
          <RoomHeaderGame className="shrink-0" />
          <div className="relative mx-4">
            <Button className="absolute top-2 w-full animate-[fade-in-down_0.5s_ease-in-out]">
              투표 하러가기
            </Button>
          </div>
        </>
      )}

      <RoomMessages className="flex-1" />
      <RoomChatBar
        className="bottom-0-dynamic fixed w-full"
        renderPlaceholder
      />
    </div>
  );

  function handleGameStart() {
    setCanStartGame(true);
  }

  function handleGameEnd() {
    rejoin?.();
  }
};

export default Room;
