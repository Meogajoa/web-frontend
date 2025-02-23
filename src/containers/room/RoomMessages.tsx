import { ChatMessage as ChatMessageComponent } from '@/components/ChatMessage';
import { SystemNotice } from '@/components/Notice';
import useChatMessages from '@/hooks/chat/useMessages';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { type ChatMessage, ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/classname';
import { convertToPlayerNumber, isValidPlayerNumber } from '@/utils/game';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useIntersection } from 'react-use';

type Props = {
  className?: string;
};

const RoomMessages = React.memo<Props>(({ className }) => {
  const t = useTranslations('roomRoute.chatMessage');
  const { currentChatRoom } = useRoom();
  const { user } = useUser();
  const { player, otherPlayers } = useGame();

  const lastMessageRef = React.useRef<HTMLLIElement>(null);
  const lastMessageIntersection = useIntersection(lastMessageRef, {
    threshold: 0.5,
  });

  const messages = useChatMessages({
    variables: { chatRoom: currentChatRoom },
    onNewMessage: scrollToBottom,
  });

  React.useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatRoom]);

  return (
    <ul
      className={cn('space-y-3 overflow-y-auto px-4 py-5 font-bold', className)}
    >
      {messages.map(({ id, content, sender, type }, index) => {
        const isSelf =
          sender === user.name || sender === player.number.toString();

        const playerNumber = convertToPlayerNumber(sender);
        const username = isValidPlayerNumber(playerNumber)
          ? t('inGameUsername', { playerNumber: sender })
          : sender;

        switch (type) {
          case ChatMessageType.Chat: {
            return (
              <ChatMessageComponent
                key={id}
                ref={index === messages.length - 1 ? lastMessageRef : undefined}
                position={isSelf ? 'right' : 'left'}
                username={username}
                message={content}
                color={otherPlayers[playerNumber]?.team}
              />
            );
          }
          case ChatMessageType.System: {
            return (
              <SystemNotice className="mx-auto" key={id} message={content} />
            );
          }
        }
      })}
    </ul>
  );

  // scroll to bottom when new message is sent
  // when user has scrolled up to see previous messages, don't scroll to bottom
  function scrollToBottom(message: ChatMessage) {
    if (
      !lastMessageIntersection?.isIntersecting &&
      message.sender !== user.name
    ) {
      return;
    }

    setTimeout(
      () => lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  }
});
RoomMessages.displayName = 'RoomMessages';

export default RoomMessages;
