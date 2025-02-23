import ChatRoomListSidebar from '@/containers/room/ChatRoomListSidebar';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import CartFillIcon from '@/svgs/CartFillIcon';
import ChatIcon from '@/svgs/ChatIcon';
import { GameTime, Team } from '@/types/game';
import { cn } from '@/utils/classname';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
};

const RoomHeaderGame = React.memo<Props>(({ className }) => {
  const t = useTranslations('roomRoute');
  const { nthDay, time, player } = useGame();
  const { currentChatRoom } = useRoom();

  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const timeLabel =
    time === GameTime.Day
      ? t('header.day')
      : time === GameTime.Night
        ? t('header.night')
        : 'Invalid Time';

  return (
    <>
      <header
        className={cn(
          'border-b-gray-5/60 relative flex h-22 items-center justify-between border-b-2 px-4',
          player.team === Team.Black && 'border-b-gray-2/20',
          player.team === Team.Red && 'border-b-red/10 bg-white',
          className,
        )}
      >
        <div className="z-10 flex items-center gap-x-2">
          <p className="text-2xl font-semibold">
            {`${nthDay}${t('header.nth')} ${timeLabel}`}
          </p>

          <p className="text-sm">{t(`chatRoomType.${currentChatRoom}`)}</p>
        </div>

        <div className="z-10 flex items-center gap-x-6">
          <span className="text-lg font-bold">₩{player.money}</span>

          <button className="cursor-pointer">
            <CartFillIcon className="fill-gray-1 size-6" />
          </button>

          <button className="cursor-pointer" onClick={handleSidebarClick(true)}>
            <ChatIcon className="fill-gray-1 size-6" />
          </button>
        </div>

        <Timer className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2" />
      </header>

      <ChatRoomListSidebar
        isVisible={sidebarVisible}
        onClose={handleSidebarClick(false)}
      />
    </>
  );

  function handleSidebarClick(visible: boolean) {
    return () => {
      setSidebarVisible(visible);
    };
  }
});
RoomHeaderGame.displayName = 'RoomHeaderGame';

type TimerProps = {
  className?: string;
};

const Timer: React.FC<TimerProps> = ({ className }) => {
  const { player } = useGame();

  return (
    <div
      className={cn(
        'bg-gray-6 flex gap-x-1 rounded-full p-1',
        player.team === Team.Black && 'bg-gray-3',
        className,
      )}
    >
      <button
        className={cn(
          'bg-gray-6 ring-gray-5/60 rounded-full ring drop-shadow-sm',
          player.team === Team.Black && 'bg-gray-3 ring-gray-2/30',
        )}
        onClick={handleMinusClick}
      >
        <MinusIcon className="fill-gray-1 size-6" />
      </button>

      <span className="bg-gray-1 flex h-5.5 w-16 items-center justify-center rounded-full text-sm text-white">
        00:20
      </span>

      <button
        className={cn(
          'bg-gray-6 ring-gray-5/60 rounded-full ring drop-shadow-sm',
          player.team === Team.Black && 'bg-gray-3 ring-gray-2/30',
        )}
        onClick={handlePlusClick}
      >
        <PlusIcon className="fill-gray-1 size-6" />
      </button>
    </div>
  );

  function handleMinusClick() {
    console.log('minus');
  }

  function handlePlusClick() {
    console.log('plus');
  }
};

export default RoomHeaderGame;
