import Input from '@/components/Input/Input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Input 타입 (text, password, email, textarea)',
      control: 'select',
      options: ['text', 'password', 'email', 'textarea'],
    },
    placeholder: {
      description: 'Input의 placeholder 텍스트',
      control: 'text',
    },
    className: {
      description: '커스텀 클래스를 추가할 수 있음',
      control: false,
    },
    variant: {
      description: 'Input 스타일',
      control: 'select',
      options: ['primary'],
    },
    rounded: {
      description: 'Input 테두리 스타일',
      control: 'select',
      options: ['full', 'lg', 'md'],
    },
    size: {
      description: 'Input 크기',
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
  },
  args: {
    type: 'text',
    placeholder: 'Enter your input',
    variant: 'primary',
    rounded: 'lg',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your text',
  },
  render: () => {
    const [value, setValue] = React.useState('');

    return <Input value={value} onValueChange={handleValueChange} />;

    function handleValueChange(newValue: string) {
      console.log(newValue);
      setValue(newValue);
    }
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const TextareaInput: Story = {
  args: {
    type: 'textarea',
    placeholder: 'Enter your message',
    className: 'h-32',
  },
};

export const LargeRoundedInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Large and rounded-sm',
    size: 'lg',
    rounded: 'full',
  },
};

export const SmallInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const WithError: Story = {
  args: {
    type: 'text',
    placeholder: 'Input with error',
    className: 'border-red-500',
  },
};
