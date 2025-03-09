import { cn } from '@/utils/classname';
import React from 'react';
type Props = React.ComponentProps<'svg'>;

const LeftArrowIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      className={cn('fill-none', className)}
      {...props}
    >
      <path d="M1 7L7 1L13 7" stroke="#1C1C1D" />
    </svg>
  );
};

export default LeftArrowIcon;
