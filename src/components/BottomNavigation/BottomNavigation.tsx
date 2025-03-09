import { type MenuType } from '@/constants/navigation';
import { cn } from '@/utils/classname';
import { Button, type ButtonProps } from '@headlessui/react';
import React from 'react';

type BottomNavigationProps = {
  className?: string;
};

const BottomNavigation: React.FC<
  React.PropsWithChildren<BottomNavigationProps>
> = ({ className, children, ...props }) => {
  return (
    <footer className={cn('flex bg-white pt-3 pb-3.5', className)} {...props}>
      <nav className="mx-auto flex w-full max-w-xl justify-around">
        {children}
      </nav>
    </footer>
  );
};

type ItemProps = Omit<MenuType, 'href'> &
  ButtonProps & {
    isActive: boolean;
    onButtonClick: () => void;
  };

const Item: React.FC<ItemProps> = ({
  className,
  label,
  icon: Icon,
  isActive,
  onButtonClick: handleClick,
}) => {
  return (
    <Button
      className={cn(
        'flex flex-col items-center gap-y-2',
        isActive
          ? 'fill-red text-red'
          : 'fill-gray-6 text-gray-6 data-[hover]:fill-red/80 data-[hover]:text-red/80',
        className,
      )}
      onClick={handleClick}
    >
      <Icon className="size-6 fill-inherit transition-colors duration-300" />
      <span className="text-sm text-inherit transition-colors duration-300">
        {label}
      </span>
    </Button>
  );
};

export default Object.assign(BottomNavigation, {
  Item,
});
