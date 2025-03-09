import { cn } from '@/utils/classname';
import React from 'react';

type Props = React.ComponentProps<'svg'>;

const MessageSendIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-none stroke-white', className)}
      {...props}
    >
      <path
        id="Vector 5"
        d="M2.21161 6.44173L18.0398 1.01492C19.231 0.606522 20.3648 1.75893 19.9371 2.9433L14.2199 18.7756C13.7757 20.0058 12.0796 20.1177 11.4775 18.9566L8.37674 12.9766C8.23979 12.7125 8.02739 12.495 7.76655 12.3519L1.97666 9.17577C0.834368 8.54914 0.979156 6.86429 2.21161 6.44173Z"
        stroke="#1C1C1D"
      />
    </svg>
  );
};

export default MessageSendIcon;
