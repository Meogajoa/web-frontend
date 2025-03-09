import { BrandModal, type BrandModalProps } from '@/components/BrandModal';
import useCreateRoom, {
  type CreateRoomForm,
  type CreateRoomResponse,
} from '@/hooks/room/useCreateRoom';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = BrandModalProps;

const CreateRoomModal: React.FC<Props> = ({ onClose, visible }) => {
  const t = useTranslations('createRoomModal');
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateRoomForm>();
  const { createRoom } = useCreateRoom({
    onSuccess: handleRedirectOnSuccess,
  });

  return (
    <BrandModal
      onClose={handleClose}
      hasBackdropBlur
      visible={visible}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BrandModal.Header>
        <BrandModal.Title label={t('title')} />
        <BrandModal.CloseButton onClose={handleClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body>
        <div>
          <label htmlFor="name" data-testid="room-name-label">
            {t('roomNameLabel')}
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="password" data-testid="room-password-label">
            {t('roomPasswordLabel')}
          </label>
          <input id="password" type="password" {...register('password')} />
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button
          kind="no"
          onClick={handleClose}
          data-testid="create-room-modal-cancel-button"
        >
          {t('cancelButton')}
        </BrandModal.Button>

        <BrandModal.Button
          kind="yes"
          type="submit"
          data-testid="create-room-modal-create-button"
        >
          {t('createButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );

  function onSubmit(data: CreateRoomForm): void {
    createRoom(data);
  }

  function handleClose() {
    onClose();
  }

  function handleRedirectOnSuccess({ id }: CreateRoomResponse) {
    router.push(`/rooms/${id}`);
  }
};

export default CreateRoomModal;
