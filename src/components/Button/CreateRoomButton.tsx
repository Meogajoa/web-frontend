'use client';

import { CreateRoomModal } from '@/components/BrandModal';
import { Button } from '@/components/Button';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
};

const CreateRoomButton: React.FC<Props> = ({ className }) => {
  const t = useTranslations('homeRoute');
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    React.useState(false);

  return (
    <>
      <Button
        className={cn('drop-shadow-2xl data-[hover]:opacity-100', className)}
        variant="primary"
        rounded="full"
        size="lg"
        icon="plus"
        onClick={handleCreateRoomClick(true)}
        data-testid="create-room-button"
      >
        {t('createRoomButton')}
      </Button>

      <CreateRoomModal
        visible={isCreateRoomModalVisible}
        onClose={handleCreateRoomClick(false)}
      />
    </>
  );

  function handleCreateRoomClick(modalVisible: boolean) {
    return () => {
      setIsCreateRoomModalVisible(modalVisible);
    };
  }
};

export default CreateRoomButton;
