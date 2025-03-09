import { BrandModal, type BrandModalProps } from '@/components/BrandModal';
import { Input } from '@/components/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = BrandModalProps;

type PasswordInputForm = {
  roomPassword: string;
};

const PasswordInputModal: React.FC<Props> = ({ onClose, visible }) => {
  const { control, handleSubmit } = useForm<PasswordInputForm>({
    defaultValues: { roomPassword: '' },
  });

  const onSubmit = (data: PasswordInputForm) => {
    console.log(data);
  };

  return (
    <BrandModal
      onClose={onClose}
      hasBackdropBlur
      visible={visible}
      onSubmit={handleSubmit(onSubmit)}
      className="w-73"
    >
      <BrandModal.Header className="mb-3">
        <BrandModal.Title label="비밀번호 입력" />
        <BrandModal.CloseButton onClose={onClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body className="w-full">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="roomPassword"
            className="text-red font-brand mb-5 text-center text-sm leading-4.5 font-bold"
          >
            잠금 처리된 방입니다.
            <br />
            비밀번호를 입력하세요.
          </label>
          <Controller
            control={control}
            name="roomPassword"
            render={({ field }) => (
              <Input
                type="password"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="비밀번호를 입력"
                className="w-55"
              />
            )}
          />
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup className="w-full">
        <BrandModal.Button kind="no" className="w-full" onClick={onClose}>
          취소
        </BrandModal.Button>

        <BrandModal.Button kind="yes" className="w-full" type="submit">
          입력 완료
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );
};

export default PasswordInputModal;
