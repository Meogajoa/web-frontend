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
        'bg-red font-brand flex size-4 items-center justify-center rounded-full text-[0.5rem] font-bold text-white',
        className,
      )}
    >
      {notice}
    </div>
  );
};

export default NoticeIcon;
