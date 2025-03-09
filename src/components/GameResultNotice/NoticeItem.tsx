import BaseNoticeItem from '@/components/GameResultNotice/BaseNoticeItem';
import { cn } from '@/utils/classname';
import React from 'react';

export type NoticeItemProps = {
  rank: number;
  nickname: string;
  score: number;
  calculation: string;
  prize: number;
  className?: string;
};

const NoticeItem: React.FC<NoticeItemProps> = ({
  className,
  rank,
  nickname,
  score,
  calculation,
  prize,
}) => {
  return (
    <BaseNoticeItem
      className={cn('flex items-center justify-between px-4 py-2', className)}
    >
      <div className="flex items-center gap-x-4">
        <div>{rank}등</div>
        <div>{nickname}</div>
        <div>{score}</div>
        <div>{calculation}</div>
      </div>

      <div className="ml-auto px-2">{prize}</div>
    </BaseNoticeItem>
  );
};

export default NoticeItem;
