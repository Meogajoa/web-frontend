import { ChatMessage as ChatMessageComponent } from '@/components/ChatMessage';
import LoadingIndicator from '@/components/LoadingIndicator';
import { SystemNotice } from '@/components/Notice';
import useChatMessages from '@/hooks/chat/useMessages';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { ChatMessageType, type ChatRoom } from '@/types/chat';
import { assert } from '@/utils/assert';
import { cn } from '@/utils/classname';
import { convertToPlayerNumber, isValidPlayerNumber } from '@/utils/game';
import { Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useIntersection } from 'react-use';

type Props = {
  className?: string;
};

const RoomMessages = React.memo<Props>(({ className }) => {
  const t = useTranslations('roomRoute.chatMessage');
  const { currentChatRoom, typing } = useRoom();
  const { user } = useUser();
  const { player, otherPlayers } = useGame();

  const containerRef = React.useRef<HTMLUListElement>(null);
  const lastMessageRef = React.useRef<HTMLLIElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const lastMessageIntersection = useIntersection(lastMessageRef, {
    threshold: 0.5,
  });

  const messages = useChatMessages({
    variables: { chatRoom: currentChatRoom },
    onNewMessage: handleNewMessage,
    onRestore: handleRestore,
  });

  React.useEffect(() => {
    scrollToBottom();
  }, [currentChatRoom]);

  React.useEffect(() => {
    assert(containerRef.current, 'containerRef.current is null');
    const observer = new ResizeObserver(() => {
      scrollToBottom();
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <ul
      className={cn('overflow-y-auto px-4 py-5 font-bold', className)}
      ref={containerRef}
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
                className="relative -left-full translate-x-full transition-transform duration-1000 not-first:mt-3"
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
              <SystemNotice
                className="mx-auto not-first:mt-3"
                key={id}
                message={content}
              />
            );
          }
        }
      })}

      <Transition
        className={cn(
          'group relative -mx-4 mt-3 max-h-10 transform-gpu overflow-hidden px-4 transition-all duration-300 ease-linear',
          'data-[closed]:mt-0 data-[closed]:max-h-0 data-[closed]:opacity-0',
        )}
        as="div"
        show={typing}
        unmount={false}
        onAnimationStart={() => setTimeout(scrollToBottom, 100)}
      >
        <ChatMessageComponent
          className="transform-gpu transition-transform duration-300 ease-linear group-data-[closed]:translate-x-full"
          username="myself"
          position="right"
          message={
            <LoadingIndicator
              loaderComponent={BeatLoader}
              size={8}
              speedMultiplier={0.6}
            />
          }
        />
      </Transition>

      <div ref={bottomRef} aria-hidden />
    </ul>
  );

  function scrollToBottom() {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function handleNewMessage() {
    if (!lastMessageIntersection?.isIntersecting) {
      return;
    }

    scrollToBottom();
  }

  function handleRestore(restoredChatRoom: ChatRoom) {
    if (
      restoredChatRoom === currentChatRoom &&
      lastMessageIntersection?.isIntersecting
    ) {
      scrollToBottom();
    }
  }
});
RoomMessages.displayName = 'RoomMessages';

export default RoomMessages;
