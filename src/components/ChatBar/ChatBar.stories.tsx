import { ChatBar } from '@/components/ChatBar';
import { type TextareaHandle } from '@/components/CustomTextarea';
import { RemovePadding } from '@/utils/storybook';
import type { Meta, StoryObj } from '@storybook/react';
import { noop } from 'lodash-es';
import React from 'react';

const meta: Meta<typeof ChatBar> = {
  title: 'Molecules/ChatBar',
  component: ChatBar,
  decorators: [
    (Story) => (
      <>
        <RemovePadding />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChatBar>;

export const Default: Story = {
  render: () => {
    const textareaRef = React.useRef<TextareaHandle>(null);

    return (
      <ChatBar className="bottom-0-dynamic fixed w-full">
        <ChatBar.MenuButton onMenuClick={noop} />
        <ChatBar.Textarea ref={textareaRef} />
        <ChatBar.SendButton onSendClick={noop} />
      </ChatBar>
    );
  },
};
