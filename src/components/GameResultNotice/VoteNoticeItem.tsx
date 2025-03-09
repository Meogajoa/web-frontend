import BaseNoticeItem from '@/components/GameResultNotice/BaseNoticeItem';
import { ProfileImage } from '@/components/ProfileImage';
import { Team } from '@/types/game';
import { cn } from '@/utils/classname';
import Image from 'next/image';
import React from 'react';

export type VoteNoticeItemProps = {
  nickname: string;
  voteIcon: string;
  votes: number;
  variant?: 'default' | 'dark';
  color?: Team;
  className?: string;
};

const VoteNoticeItem: React.FC<VoteNoticeItemProps> = ({
  nickname,
  voteIcon,
  color = Team.Invalid,
  votes,
  className,
}) => {
  return (
    <BaseNoticeItem
      variant="dark"
      className={cn('flex h-7 items-center', className)}
    >
      <div className="flex items-center">
        <ProfileImage size="sm" color={color} />
        <div className="mr-2 ml-1.5 flex items-center px-2">{nickname}</div>
        <div className="flex gap-1">
          {Array.from({ length: votes }).map((_, iconIndex) => (
            <Image
              key={iconIndex}
              src={voteIcon}
              alt="vote icon"
              width={10}
              height={10}
            />
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">{votes}</div>
    </BaseNoticeItem>
  );
};

export default VoteNoticeItem;
