import { SystemNotice } from '@/components/Notice';
import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SystemNotice> = {
  title: 'Atoms/SystemNotice',
  component: SystemNotice,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Color',
      control: 'select',
      options: [Team.Black, Team.White, Team.Red],
    },
    message: {
      description: 'Message',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SystemNotice>;

export const Default: Story = {
  args: {
    color: Team.Black,
    message:
      '오늘의 미니게임은 “신뢰게임” 입니다.\n20초 후 게임 시작하겠습니다.',
  },
};
