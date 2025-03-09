import { CreateRoomModal } from '@/components/BrandModal';
import { Button } from '@/components/Button';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: React.ComponentProps<'button'>['className'];
};

const PasswordInputButton: React.FC<Props> = ({ className }) => {
  const messages = useTranslations('homeRoute');
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
      >
        {messages('createRoomButton')}
      </Button>

      <CreateRoomModal
        onClose={handleCreateRoomClick(false)}
        visible={isCreateRoomModalVisible}
      />
    </>
  );

  function handleCreateRoomClick(modalVisible: boolean) {
    return () => {
      setIsCreateRoomModalVisible(modalVisible);
    };
  }
};

export default PasswordInputButton;
