import { RoomItem } from '@/components/RoomItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RoomItem> = {
  title: 'Molecules/Room',
  component: RoomItem,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Room title',
      control: 'text',
    },
    description: {
      description: 'Room description',
      control: 'text',
    },
    isPrivate: {
      description: 'Is room private',
      control: 'boolean',
    },
    current: {
      description: 'Current room number',
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
    },
    total: {
      description: 'Total room number',
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
    },
  },
  args: {
    title: 'Room Title',
    description: 'Room Description',
    isPrivate: false,
    current: 1,
    total: 8,
  },
};

export default meta;

type Story = StoryObj<typeof RoomItem>;

export const Default: Story = {
  args: {
    className: '',
  },
};
