import { Button } from '@/components/Button';
import RoomChatBar from '@/containers/room/RoomChatBar';
import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import RoomMessages from '@/containers/room/RoomMessages';
import RoomUserList from '@/containers/room/RoomUserList';
import useGamePlay from '@/hooks/game/useGamePlay';
import useBodyBgColor from '@/hooks/misc/useBodyBgColor';
import useRoomSystemNotice from '@/hooks/room/useRoomSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { GameModal, MiniGame, Team } from '@/types/game';
import { convertToTeamChatRoom } from '@/utils/chat';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useMeasure } from 'react-use';

type Props = {
  className?: string;
  rejoin?: () => void;
};

const Room: React.FC<Props> = ({ className, rejoin }) => {
  const t = useTranslations('roomRoute');
  const { id, playing, currentChatRoom } = useRoom();
  const { player, playingMiniGame, setModalVisible } = useGame();
  const [canStartGame, setCanStartGame] = React.useState(playing);
  const [infoSectionRef, { height: infoSectionHeight }] = useMeasure();

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
      {!playing ? (
        <RoomHeaderLobby className="shrink-0" />
      ) : (
        <RoomHeaderGame className="shrink-0" />
      )}

      <section className="relative z-10" aria-label="Info Section">
        <div
          className={cn(
            'absolute w-full px-4',
            !playing && 'bg-gray-5/30',
            playingMiniGame === MiniGame.Vote &&
              currentChatRoom === convertToTeamChatRoom(player.team) &&
              'top-2 animate-[fade-in-down_0.5s_ease-in-out]',
          )}
          ref={infoSectionRef as unknown as React.RefObject<HTMLDivElement>}
        >
          {!playing && <RoomUserList />}

          {playingMiniGame === MiniGame.Vote &&
            currentChatRoom === convertToTeamChatRoom(player.team) && (
              <Button className="w-full" onClick={handleVoteGameModalOpen}>
                {t('voteMiniGameButton')}
              </Button>
            )}
        </div>
      </section>

      <RoomMessages
        className="flex-1"
        key={infoSectionHeight}
        topPaddingHeight={infoSectionHeight}
      />
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

  function handleVoteGameModalOpen() {
    setModalVisible(GameModal.VoteMiniGame);
  }
};

export default Room;
