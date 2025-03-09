import { Team } from '@/types/game';
import { cn } from '@/utils/classname';
import React from 'react';

export type NumberIconBallProps = {
  className?: string;
  number: number;
  color: Team;
};

const NumberIconBall: React.FC<NumberIconBallProps> = ({
  className,
  number,
  color,
}) => {
  return (
    <div
      className={cn(
        'font-brand flex size-4 items-center justify-center rounded-full text-[0.5rem] font-bold text-white',
        color === Team.Black ? 'bg-gray-1' : 'bg-gray-5',
        className,
      )}
    >
      {number}
    </div>
  );
};

export default NumberIconBall;
