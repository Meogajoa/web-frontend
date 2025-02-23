import { Button } from '@/components/Button';
import { MAX_USERS } from '@/constants/game';
import useStartGame from '@/hooks/game/useStartGame';
import useRoomUsersNotice from '@/hooks/room/useRoomUsersNotice';
import { useRouter } from '@/i18n/routing';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { cn } from '@/utils/classname';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { type AxiosError } from 'axios';
import { debounce } from 'lodash-es';
import React from 'react';

type Props = {
  className?: string;
};

const RoomHeaderLobby = React.memo<Props>(({ className }) => {
  const router = useRouter();
  const { user } = useUser();

  const { id } = useRoom();
  const { users } = useRoomUsersNotice({ variables: { id } });
  const { startGame, isPending, isSuccess } = useStartGame({
    onError: handleStartGameError,
  });
  const { title, hostNickname } = useRoom();

  const handleStartGameClick = React.useCallback(
    debounce(_handleStartGameClick, 500, { leading: true }),
    [users],
  );

  return (
    <header
      className={cn('relative flex h-22 items-center bg-white px-4', className)}
    >
      <button onClick={handleBackClick}>
        <ArrowLeftIcon className="fill-gray-1 size-6" />
      </button>

      <h2 className="ml-2">{title}</h2>

      {user.name === hostNickname && (
        <Button
          className="ml-auto px-4"
          variant="primary"
          rounded="full"
          size="sm"
          disabled={isSuccess || users.length < MAX_USERS}
          loading={isPending}
          onClick={handleStartGameClick}
        >
          게임 시작
        </Button>
      )}
    </header>
  );

  function handleBackClick() {
    router.back();
  }

  function _handleStartGameClick() {
    if (users.length < MAX_USERS) {
      return;
    }

    startGame({ id });
  }

  function handleStartGameError(error: AxiosError<void>) {
    console.error(error);
  }
});
RoomHeaderLobby.displayName = 'RoomHeaderLobby';

export default RoomHeaderLobby;
