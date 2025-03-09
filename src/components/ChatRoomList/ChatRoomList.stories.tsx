import img from '@/assets/images/cat.png';
import ChatRoomList from '@/components/ChatRoomList/ChatRoomList';
import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChatRoomList> = {
  title: 'Organisms/ChatListSidebar',
  component: ChatRoomList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChatRoomList>;

export const Default: Story = {
  args: {
    rooms: [
      {
        type: 'personal',
        title: '김철수',
        content: '안녕하세요',
        image: img.src,
      },
      {
        type: 'group',
        title: '그룹채팅방',
        content: '안녕하세요',
        groupImages: [img.src, Team.White, img.src, Team.Black],
      },
      {
        type: 'personal',
        title: '김철수',
        content: '(상대팀 채팅방을 볼 수 없습니다)',
        isSpy: true,
        image: Team.Black,
      },
      {
        type: 'personal',
        title: '김철수',
        content: '안녕하세요',
        notice: 3,
        hasAccess: false,
        image: img.src,
      },
      {
        type: 'personal',
        title: '김철수',
        content: '안녕하세요',
        notice: 3,
        image: img.src,
      },
      {
        type: 'personal',
        title: '김철수',
        content: '안녕하세요',
        notice: 99,
        image: img.src,
      },
    ],
    onClose: () => alert('닫기 클릭'),
    onExit: () => alert('나가기 클릭'),
    onNotificationClick: () => alert('알림 클릭'),
  },
};
