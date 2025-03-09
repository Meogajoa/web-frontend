import { cn } from '@/utils/classname';
import React from 'react';
type Props = React.ComponentProps<'svg'>;

const LeftArrowIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn('fill-none', className)}
      {...props}
    >
      <path
        d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
        fill="white"
      />
    </svg>
  );
};

export default LeftArrowIcon;
