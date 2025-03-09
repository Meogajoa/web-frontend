import { cn } from '@/utils/classname';
import {
  Button as _Button,
  type ButtonProps as _ButtonProps,
} from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { PulseLoader } from 'react-spinners';

const BUTTON_ICONS = {
  'chevron-down': ChevronDownIcon,
  plus: PlusIcon,
} as const;

const buttonVariant = cva(
  'group data-[disabled]:bg-gray-5 inline-block cursor-pointer text-center font-bold text-white transition duration-300 data-[active]:opacity-70 data-[disabled]:cursor-not-allowed data-[focus]:outline-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-red',
        secondary: 'bg-sub',
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-lg',
      },
      size: {
        lg: 'h-12 px-4 py-2.5 text-xl',
        md: 'h-11 w-fit p-2.5 text-base',
        sm: 'h-9 py-2.5 text-base',
      },
      icon: {
        'chevron-down': 'flex items-center gap-x-1 px-4',
        plus: 'flex flex-row-reverse items-center gap-x-1 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'md',
      size: 'lg',
    },
  },
);

export type ButtonProps = _ButtonProps &
  VariantProps<typeof buttonVariant> & {
    loading?: boolean;
  };

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className,
  icon,
  loading,
  children,
  ...props
}) => {
  const Icon = BUTTON_ICONS[icon!];

  return (
    <_Button
      className={cn(buttonVariant({ icon, ...props }), className)}
      {...props}
    >
      {loading ? <PulseLoader color="#bbbb00" size={10} /> : children}
      {Icon && (
        <Icon className="size-4.5 stroke-white stroke-2 transition-transform duration-300 group-data-[open]:-rotate-180" />
      )}
    </_Button>
  );
};

export default Button;
