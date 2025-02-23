import { Button } from '@/components/Button';
import { cn } from '@/utils/classname';
import {
  Button as _Button,
  type ButtonProps as _ButtonProps,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Modal, { type ModalProps } from '../Modal';

export type BrandModalProps = ModalProps & {
  className?: string;
};

const BrandModal: React.FC<BrandModalProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Modal className={cn('bg-gray-6 size-fit max-w-lg', className)} {...props}>
      {children}
    </Modal>
  );
};

type HeadeProps = {
  className?: string;
};

const Header: React.FC<React.PropsWithChildren<HeadeProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'bg-gray-5 relative flex h-16 w-full items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

type TitleProps = {
  className?: string;
  label: string;
};

const Title: React.FC<TitleProps> = ({ className, label }) => {
  return <h1 className={cn('text-2xl font-bold', className)}>{label}</h1>;
};

type CloseButtonProps = _ButtonProps & {
  className?: string;
  position?: 'right' | 'left';
  onClose: () => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  position = 'right',
  onClose: handleClose,
  ...props
}) => {
  return (
    <_Button
      className={cn(
        'fill-gray-1 absolute size-6 cursor-pointer stroke-2',
        position === 'right' ? 'right-4' : 'left-4',
        className,
      )}
      as={XMarkIcon}
      onClick={handleClose}
      {...props}
    />
  );
};

type BodyProps = {
  className?: string;
};

const Body: React.FC<React.PropsWithChildren<BodyProps>> = ({
  className,
  children,
}) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};

type ButtonGroup = {
  className?: string;
};

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroup>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('flex justify-center space-x-8 p-5', className)}>
      {children}
    </div>
  );
};

type ModalButtonProps = {
  className?: string;
  kind: 'yes' | 'no';
  type?: React.ComponentProps<'button'>['type'];
  disabled?: boolean;
  onClick?: () => void;
  'data-testid'?: string;
};

const ModalButton: React.FC<React.PropsWithChildren<ModalButtonProps>> = ({
  className,
  kind,
  type,
  disabled,
  onClick: handleClick,
  'data-testid': dataTestId,
  children,
}) => {
  return (
    <Button
      className={cn('', className)}
      rounded="full"
      size="lg"
      variant={kind === 'yes' ? 'primary' : 'secondary'}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
};

export default Object.assign(BrandModal, {
  Header,
  Title,
  CloseButton,
  Body,
  ButtonGroup,
  Button: ModalButton,
});
