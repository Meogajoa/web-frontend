import ChatRoom, {
  type ChatRoomProps,
} from '@/components/ChatRoomList/ChatRoom';
import BellIcon from '@/svgs/BellIcon';
import LeftArrowIcon from '@/svgs/LeftArrowIcon';
import OutIcon from '@/svgs/OutIcon';
import { cn } from '@/utils/classname';
import React from 'react';

export type ChatRoomListProps = {
  className?: string;
  rooms: ChatRoomProps[];
  onClose: () => void;
  onExit: () => void;
  onNotificationClick?: () => void;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  className,
  rooms,
  onClose,
  onExit,
  onNotificationClick,
}) => {
  return (
    <div className={cn('bg-gray-1 flex size-full flex-col px-4', className)}>
      <button
        className="flex w-fit cursor-pointer items-center justify-start gap-x-2 py-4"
        onClick={onClose}
      >
        <LeftArrowIcon className="-mt-0.5 size-4" />
        <div className="text-2xl font-semibold text-white">채팅방 이동</div>
      </button>

      <ul className="scrollbar-hide flex-1 divide-y divide-white/10 overflow-y-auto">
        {rooms.map((room, index) => (
          <li key={index}>
            <ChatRoom {...room} />
          </li>
        ))}
      </ul>

      <section className="flex items-center justify-between py-4">
        <button className="size-6 cursor-pointer fill-white" onClick={onExit}>
          <OutIcon />
        </button>
        <button
          className="h-5.5 w-4.5 cursor-pointer fill-white"
          onClick={onNotificationClick}
        >
          <BellIcon />
        </button>
      </section>
    </div>
  );
};

export default ChatRoomList;
