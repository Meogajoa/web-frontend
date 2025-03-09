import { Button } from '@/components/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '버튼 텍스트',
      control: 'text',
    },
    variant: {
      description: '버튼 스타일',
      control: 'select',
      options: ['primary'],
    },
    size: {
      description: '버튼 크기',
      control: 'select',
      options: ['lg', 'md'],
    },
    loading: {
      description: '로딩 중 여부',
      control: 'boolean',
    },
    disabled: {
      description: '버튼 비활성화 여부',
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryLarge: Story = {
  args: {
    children: '계속하기',
    variant: 'primary',
    size: 'lg',
    rounded: 'md',
    className: 'w-full',
  },
};

export const PrimaryMedium: Story = {
  args: {
    children: '중복확인',
    variant: 'primary',
    size: 'md',
    rounded: 'md',
  },
};

export const SecondaryLarge: Story = {
  args: {
    children: '계속하기',
    variant: 'secondary',
    size: 'lg',
    rounded: 'md',
    className: 'w-full',
  },
};

export const DropDown: Story = {
  args: {
    children: '카테고리',
    variant: 'primary',
    size: 'md',
    rounded: 'full',
    icon: 'chevron-down',
  },
};

export const Plus: Story = {
  args: {
    children: '방 생성',
    variant: 'primary',
    size: 'lg',
    rounded: 'full',
    icon: 'plus',
  },
};
