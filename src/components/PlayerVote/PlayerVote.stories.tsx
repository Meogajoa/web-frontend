import { PlayerVote } from '@/components/PlayerVote';
import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PlayerVote> = {
  title: 'Molecules/PlayerVote',
  component: PlayerVote,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '버튼 색상',
      control: 'select',
      options: [Team.Black, Team.White, Team.Red],
    },
    voteCount: {
      description: '투표 수',
      control: {
        type: 'range',
        min: 0,
        max: 20,
        step: 1,
      },
    },
    username: {
      description: '유저 이름',
      control: 'text',
    },
    playerNumber: {
      description: '플레이어 번호',
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlayerVote>;

export const Default: Story = {
  args: {
    color: Team.Black,
    playerNumber: 1,
    voteCount: 0,
    username: 'username',
  },
};
