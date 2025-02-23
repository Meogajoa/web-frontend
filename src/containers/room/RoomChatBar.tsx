import { ChatBar } from '@/components/ChatBar';
import { type TextareaHandle } from '@/components/CustomTextarea';
import { A_SECOND } from '@/constants/misc';
import useSessionId from '@/hooks/account/useSessionId';
import useStompClient from '@/hooks/stomp/useStompClient';
import { useRoom } from '@/providers/RoomProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { assert } from '@/utils/assert';
import { cn } from '@/utils/classname';
import { debounce, noop } from 'lodash-es';
import React from 'react';

type Props = {
  className?: string;
  renderPlaceholder?: boolean;
};

const RoomChatBar = React.memo<Props>(({ className, renderPlaceholder }) => {
  const chatBarRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<TextareaHandle>(null);
  const [height, setHeight] = React.useState(0);

  const stompClient = useStompClient();
  const sessionId = useSessionId();
  const { id, currentChatRoom, setTyping } = useRoom();

  // Used useMemo instead of useCallback, becaouse debounce from lodash creates a new function every render
  const debouncedSetTyping = React.useMemo(
    () => debounce(setTyping, 3 * A_SECOND),
    [],
  );

  React.useLayoutEffect(() => {
    assert(chatBarRef.current, 'chatBarRef.current is null');
    const rect = chatBarRef.current.getBoundingClientRect();
    setHeight(rect.height);
  }, []);

  React.useEffect(() => {
    assert(chatBarRef.current, 'chatBarRef.current is null');
    const observer = new ResizeObserver(([entry]) => {
      const { height } = entry.contentRect;
      setHeight(height);
    });

    observer.observe(chatBarRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {renderPlaceholder && (
        <div
          className="shrink-0"
          style={{
            height: `${height}px`,
          }}
          aria-hidden
        />
      )}

      <div className={cn('', className)} ref={chatBarRef}>
        <ChatBar>
          <ChatBar.MenuButton onMenuClick={noop} />
          <ChatBar.Textarea
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            onInput={handleTextareaChange}
          />
          <ChatBar.SendButton onSendClick={handleSend} />
        </ChatBar>
      </div>
    </>
  );

  function handleSend() {
    if (!textareaRef.current) {
      return;
    }

    const message = textareaRef.current.getValue();
    textareaRef.current.blur();
    textareaRef.current?.focus();
    setTimeout(() => {
      textareaRef.current?.clear();
    }, 0);

    stompClient?.publish({
      headers: {
        Authorization: sessionId,
      },
      destination: getMessageDestination(currentChatRoom),
      body: JSON.stringify({ type: ChatMessageType.Chat, content: message }),
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (event.key === 'Enter' && event.metaKey) ||
      (event.key === 'Enter' && event.ctrlKey)
    ) {
      event.preventDefault();
      handleSend();
      setTyping(false);
      debouncedSetTyping.cancel();
    }
  }

  function handleTextareaChange() {
    setTyping(true);
    debouncedSetTyping(false);
  }

  function getMessageDestination(chatRoom: ChatRoom) {
    switch (chatRoom) {
      case ChatRoom.Black:
        return `/app/game/${id}/chat/black`;
      case ChatRoom.White:
        return `/app/game/${id}/chat/white`;
      case ChatRoom.Red:
        return `/app/game/${id}/chat/red`;
      case ChatRoom.Eliminated:
        return `/app/game/${id}/chat/eliminated`;
      case ChatRoom.General:
        return `/app/game/${id}/chat`;
      case ChatRoom.Lobby:
        return `/app/room/${id}/chat`;
      default:
        const number = Number(chatRoom);
        assert(number >= 1 && number <= 8, `Invalid chat room: ${chatRoom}`);
        return `/app/game/${id}/user/${chatRoom}/chat`;
    }
  }
});
RoomChatBar.displayName = 'RoomChatBar';

export default RoomChatBar;
