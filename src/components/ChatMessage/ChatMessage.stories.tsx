import ExampleImage from '@/assets/images/cat.png';
import { ChatMessage } from '@/components/ChatMessage';
import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChatMessage> = {
  title: 'Molecules/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: '메시지 위치',
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
    username: {
      description: '유저 이름',
      control: {
        type: 'text',
      },
    },
    isCumulative: {
      description: '누적 메시지 여부',
      control: {
        type: 'boolean',
      },
    },
    color: {
      description: '프로필 이미지 색상',
      control: 'select',
      options: ['lightgray', 'light-gray'],
    },
    src: {
      description: '프로필 이미지 URL',
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-3 relative p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const Other: Story = {
  args: {
    position: 'left',
    username: 'John Doe',
    color: Team.White,
    message: 'Hello, world!',
  },
};

export const ImageProfile: Story = {
  args: {
    position: 'left',
    username: 'John Doe',
    message: 'Hello, world!',
    src: ExampleImage.src,
  },
};

export const Self: Story = {
  args: {
    position: 'right',
    username: 'Jane Doe',
    color: Team.White,
    message: 'Hello, world!',
  },
};

export const LongMessage: Story = {
  args: {
    position: 'left',
    username: 'John Doe',
    color: Team.White,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec elit ultricies ultricies. Nullam nec purus nec elit ultricies ultricies.',
  },
};
