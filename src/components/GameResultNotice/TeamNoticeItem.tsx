import BaseNoticeItem from '@/components/GameResultNotice/BaseNoticeItem';
import NumberIconBall from '@/components/GameResultNotice/NumberIconBall';
import { type Team } from '@/types/game';
import { cn } from '@/utils/classname';
import React from 'react';

export type TeamNoticeItemProps = {
  rank: number;
  teamName: string;
  numberIcons: { number: number; team: Team }[];
  variant?: 'default' | 'dark';
  prize: number;
  className?: string;
};

const TeamNoticeItem: React.FC<TeamNoticeItemProps> = ({
  rank,
  teamName,
  numberIcons,
  variant = 'default',
  prize,
  className,
}) => {
  return (
    <BaseNoticeItem variant={variant} className={cn('flex', className)}>
      <div className="flex items-center">
        <div className="mr-4 pr-2">{rank}등</div>
        <div className="mr-2 px-2">{teamName}팀</div>
        <div className="flex gap-1">
          {numberIcons.map(({ number, team }, index) => (
            <NumberIconBall key={index} number={number} color={team} />
          ))}
        </div>
      </div>

      <div className="ml-auto text-white">₩{prize}</div>
    </BaseNoticeItem>
  );
};

export default TeamNoticeItem;
