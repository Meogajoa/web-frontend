'use client';

import { cn } from '@/utils/classname';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React from 'react';

export type ModalProps = React.ComponentProps<'form'> & {
  overlayClassName?: string;
  visible: boolean;
  onClose: () => void;
  hasBackdropBlur?: boolean;
  verticalAlignment?: 'top' | 'center' | 'bottom';
  horizontalAlignment?: 'left' | 'center' | 'right';
  onSubmit?: () => void;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  className,
  overlayClassName,
  visible,
  hasBackdropBlur,
  verticalAlignment = 'center',
  horizontalAlignment = 'center',
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <Dialog
      className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto"
      transition
      open={visible}
      onClose={onClose}
    >
      <DialogBackdrop
        className={cn(
          'fixed inset-0 bg-black/60 duration-300 ease-in-out data-[closed]:opacity-0',
          overlayClassName,
        )}
        transition
      />
      {/* NOTE: backdrop-blur with opacity transition makes rendering slow */}
      {hasBackdropBlur && (
        <DialogBackdrop className="fixed inset-0 backdrop-blur-xl" />
      )}

      <DialogPanel
        className={cn(
          'relative size-full duration-300 ease-in-out data-[closed]:opacity-0',
          verticalAlignment === 'top' && 'items-start',
          verticalAlignment === 'center' && 'items-center',
          verticalAlignment === 'bottom' && 'items-end',
          horizontalAlignment === 'left' && 'mr-auto',
          horizontalAlignment === 'center' && 'mx-auto',
          horizontalAlignment === 'right' && 'ml-auto',
          className,
        )}
        as="form"
        transition
        onSubmit={onSubmit}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
