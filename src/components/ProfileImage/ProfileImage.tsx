import { PlayerNumber, Team } from '@/types/game';
import { cn } from '@/utils/classname';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

const variants = cva('relative overflow-clip rounded-[0.625rem]', {
  variants: {
    size: {
      sm: 'size-5.5 rounded-[0.3rem]',
      md: 'size-9',
      lg: 'size-12',
      xl: 'size-15',
    },
    color: {
      [Team.Black]: 'bg-gray-2',
      [Team.White]: 'bg-gray-5',
      [Team.Red]: 'bg-red',
      [Team.Invalid]: 'bg-gray-2',
    },
  },
  defaultVariants: {
    size: 'md',
    color: Team.Black,
  },
});

export type ProfileImageProps = VariantProps<typeof variants> & {
  className?: string;
  playerNumber?: PlayerNumber;
  src?: string;
  as?: React.ElementType;
  onClick?: () => void;
};

const ProfileImage: React.FC<React.PropsWithChildren<ProfileImageProps>> = ({
  className,
  size,
  color,
  playerNumber = PlayerNumber.Invalid,
  src,
  as: Component = 'button',
  onClick: handleClick,
  children,
}) => {
  return (
    <Component
      className={cn(variants({ size, color }), className)}
      onClick={handleClick}
    >
      {src && (
        <Image
          className="object-cover object-center"
          src={src}
          alt="profile"
          fill
        />
      )}

      {playerNumber !== PlayerNumber.Invalid && (
        <mark className="bg-gray-4 absolute top-0.5 right-0.5 flex size-6 items-center justify-center rounded-lg text-[0.625rem] font-bold text-black">
          {playerNumber}
        </mark>
      )}

      {children}
    </Component>
  );
};

export default ProfileImage;
