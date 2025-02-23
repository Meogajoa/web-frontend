import { ProfileImage } from '@/components/ProfileImage';
import { Team } from '@/types/game';
import { isTeam } from '@/utils/chat';
import { cn } from '@/utils/classname';
import React from 'react';

export type ChatRoomProps = {
  className?: string;
  title: string;
  content: string | (() => string);
  isSpy?: boolean;
  hasAccess?: boolean;
  notice?: number;
  onClick?: () => void;
} & (
  | {
      type: 'personal';
      image?: string | Team;
    }
  | {
      type: 'group';
      groupImages?: string[] | Team[];
    }
);

const ChatRoom: React.FC<ChatRoomProps> = ({
  className,
  title,
  content,
  isSpy,
  hasAccess = true,
  notice = 0,
  onClick,
  type,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex w-full cursor-pointer items-center py-2.5',
        className,
      )}
      onClick={onClick}
    >
      <div className="size-11.5">
        {type === 'personal' && 'image' in props && props.image && (
          <ProfileImage
            as="div"
            src={isTeam(props.image) ? undefined : props.image}
            color={
              isTeam(props.image)
                ? props.image === Team.Black
                  ? Team.Black
                  : Team.White
                : undefined
            }
            size="lg"
          />
        )}
        {type === 'group' && 'groupImages' in props && props.groupImages && (
          <div className="grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden">
            {props.groupImages.slice(0, 4).map((img, index) => (
              <ProfileImage
                as="div"
                key={index}
                src={isTeam(img) ? undefined : img}
                color={isTeam(img) ? img : undefined}
                size="sm"
              />
            ))}
          </div>
        )}
      </div>

      <div className="ml-3 flex-1 space-y-2.5 text-base font-medium text-white">
        <div className="text-left">
          <span>{title}</span>
          {isSpy && <span className="text-red font-normal">{' (스파이)'}</span>}
        </div>
        <div
          className={cn(
            'text-red w-fit text-[0.625rem]',
            hasAccess && 'text-gray-5',
          )}
        >
          {typeof content === 'function' ? content() : content}
        </div>
      </div>

      {notice > 0 && (
        <mark className="font-brand bg-red flex size-4 items-center justify-center rounded-full text-[0.5rem] font-bold text-white">
          {notice}
        </mark>
      )}
    </button>
  );
};

export default ChatRoom;
