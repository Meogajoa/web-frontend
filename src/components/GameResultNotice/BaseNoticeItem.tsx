import { cn } from '@/utils/classname';
import React, { type PropsWithChildren } from 'react';

type BaseNoticeItemProps = {
  className?: string;
  variant?: 'default' | 'dark';
};

const BaseNoticeItem: React.FC<PropsWithChildren<BaseNoticeItemProps>> = ({
  className,
  variant = 'default',
  children,
}) => {
  return (
    <div
      className={cn(
        'font-brand flex h-6 w-full items-center justify-between rounded-sm px-2 py-1 text-sm text-white',
        variant === 'dark' ? 'bg-gray-2' : 'bg-gray-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BaseNoticeItem;
