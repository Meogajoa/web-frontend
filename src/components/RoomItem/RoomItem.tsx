import { Link } from '@/i18n/routing';
import LockIcon from '@/svgs/LockIcon';
import { cn } from '@/utils/classname';
import React from 'react';

type Props = {
  className?: string;
  id: string;
  title: string;
  description: string;
  total: number;
  current: number;
  isPrivate: boolean;
};

const RoomItem: React.FC<Props> = ({
  className,
  id,
  title,
  description,
  total = 8,
  current,
  isPrivate,
}) => {
  return (
    <li
      className={cn(
        'bg-gray-6 data-[hover]:ring-gray-5 h-14 list-none rounded-[0.625rem] transition-all data-[hover]:ring-3',
        className,
      )}
    >
      <Link className="flex items-center p-4" href={`/rooms/${id}`}>
        <p className="text-2xl" data-testid={`room-name-${title}`}>
          {title}
        </p>
        <p className="ml-2 text-sm">{description}</p>
        <LockIcon
          className={cn(
            'invisible ml-auto size-4 fill-black',
            isPrivate && 'visible',
          )}
        />
        <p className="ml-2 text-2xl">
          {current}/{total}
        </p>
      </Link>
    </li>
  );
};

export default RoomItem;
