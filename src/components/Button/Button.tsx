import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { PulseLoader } from 'react-spinners';
import { cn } from '~/utils/classname';

const BUTTON_ICONS = {
  'chevron-down': ChevronDownIcon,
  plus: PlusIcon,
} as const;

const buttonVariant = cva(
  'data-[disabled]:bg-gray-5 data-[focus]:outline-hidden group inline-block text-center font-bold text-white transition duration-300 data-[disabled]:cursor-not-allowed data-[active]:opacity-70 data-[hover]:opacity-90',
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

export type ButtonProps = HeadlessButtonProps &
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
    <HeadlessButton
      className={cn(buttonVariant({ icon, ...props }), className)}
      {...props}
    >
      {loading ? <PulseLoader color="#bbbb00" size={10} /> : children}
      {Icon && (
        <Icon className="size-4.5 stroke-white stroke-2 transition-transform duration-300 group-data-[open]:-rotate-180" />
      )}
    </HeadlessButton>
  );
};

export default Button;
