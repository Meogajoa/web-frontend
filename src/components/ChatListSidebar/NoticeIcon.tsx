import React from 'react';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  notice: number;
};

const NoticeIcon: React.FC<Props> = ({ className, notice }) => {
  return (
    <div
      className={cn(
        'bg-red flex size-4 items-center justify-center rounded-full font-brand text-[0.5rem] font-bold text-white',
        className,
      )}
    >
      {notice}
    </div>
  );
};

export default NoticeIcon;
