import { BrandModal } from '@/components/BrandModal';
import PasswordInputModal from '@/components/BrandModal/PasswordInputModal';
import { Button } from '@/components/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

const meta: Meta<typeof BrandModal> = {
  title: 'Organisms/BrandModal',
  component: BrandModal,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'The class name of the modal.',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BrandModal>;

export const Default: Story = {
  render: (props) => {
    const [brandModalVisible, setBrandModalVisible] = React.useState(false);
    const [passwordModalVisible, setPasswordModalVisible] =
      React.useState(false);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={() => setBrandModalVisible(true)}>
            브랜드 모달 열기
          </Button>
          <BrandModal
            {...props}
            visible={brandModalVisible}
            hasBackdropBlur
            onClose={() => setBrandModalVisible(false)}
          >
            <BrandModal.Header>
              <BrandModal.Title label="Title" />
              <BrandModal.CloseButton
                onClose={() => setBrandModalVisible(false)}
                position="right"
              />
            </BrandModal.Header>

            <BrandModal.Body>모달 내용입니다.</BrandModal.Body>

            <BrandModal.ButtonGroup>
              <BrandModal.Button
                kind="no"
                onClick={() => setBrandModalVisible(false)}
              >
                나가기
              </BrandModal.Button>
              <BrandModal.Button
                kind="yes"
                onClick={() => setBrandModalVisible(false)}
              >
                남아있기
              </BrandModal.Button>
            </BrandModal.ButtonGroup>
          </BrandModal>
        </div>

        <div>
          <Button onClick={() => setPasswordModalVisible(true)}>
            비밀번호 입력 모달 열기
          </Button>
          <PasswordInputModal
            {...props}
            visible={passwordModalVisible}
            onClose={() => setPasswordModalVisible(false)}
          />
        </div>
      </>
    );
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    return (
      <>
        <button onClick={() => setVisible(true)}>모달 열기 버튼</button>
        <PasswordInputModal
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </>
    );
  },
};
