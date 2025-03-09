import { Team } from '@/types/game';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';
import React, { type PropsWithChildren } from 'react';

const noticeVariant = cva(
  'w-fit rounded-full px-4 py-2.5 text-center text-sm font-medium whitespace-pre-line text-white',
  {
    variants: {
      color: {
        [Team.Black]: 'bg-gray-1',
        [Team.White]: 'bg-gray-4',
        [Team.Red]: 'bg-red/15',
      },
    },
    defaultVariants: {
      color: Team.Black,
    },
  },
);

type Props = VariantProps<typeof noticeVariant> & {
  className?: string;
  message?: string;
};

const SystemNotice: React.FC<PropsWithChildren<Props>> = ({
  className,
  color,
  message,
}) => {
  return <p className={cn(noticeVariant({ color }), className)}>{message}</p>;
};

export default SystemNotice;
