import { Dropdown, DropdownExample } from '@/components/Dropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Dropdown Button Disabled',
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="pb-32">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    children: 'Dropdown',
  },
  render: (props) => <DropdownExample {...props} />,
};
