import { ChatRoomList } from '@/components/ChatRoomList';
import { type ChatRoomProps } from '@/components/ChatRoomList/ChatRoom';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { GameTime, PlayerNumber, PlayerStatus, Team } from '@/types/game';
import { convertToPersonalChatRoom, filterUserMessages } from '@/utils/chat';
import { cn } from '@/utils/classname';
import { convertToPlayerNumber, isValidPlayerNumber } from '@/utils/game';
import { Transition } from '@headlessui/react';
import { compact, last, noop, shuffle } from 'lodash-es';
import { useTranslations } from 'next-intl';
import React from 'react';

const RECENT_MESSAGES_COUNT = -10;

type Props = {
  className?: string;
  isVisible: boolean;
  overlayClassName?: string;
  onClose: () => void;
};

const ChatRoomListSidebar: React.FC<Props> = ({
  className,
  overlayClassName,
  isVisible,
  onClose,
}) => {
  const t = useTranslations('roomRoute');
  const {
    player,
    otherPlayers,
    whitePlayerNumbers,
    blackPlayerNumbers,
    redPlayerNumbers,
    eliminatedPlayerNumbers,
    time,
  } = useGame();
  const { messagesByRoom, setCurrentChatRoom } = useRoom();

  return (
    <>
      <Transition
        className={cn(
          'absolute top-0 right-0 z-40 size-full max-w-1/3 min-w-xs transition-transform duration-300 ease-in-out',
          className,
        )}
        as="div"
        show={isVisible}
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <ChatRoomList
          rooms={compact<ChatRoomProps>([
            // General Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.general`),
              groupImages: shuffle(otherPlayers).map((player) => player.team),
              content() {
                if (time === GameTime.Night) {
                  return t('chatRoom.noAccessWhenNight');
                }

                const userMessages = filterUserMessages(
                  messagesByRoom[ChatRoom.General].slice(RECENT_MESSAGES_COUNT),
                );

                return (
                  last(userMessages)?.content?.trim() ||
                  t('chatRoom.emptyContent')
                );
              },
              hasAccess:
                player.status !== PlayerStatus.Invalid &&
                time !== GameTime.Night,
              onClick() {
                if (player.status === PlayerStatus.Invalid) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.General);
              },
            },
            // White Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.white`),
              groupImages: whitePlayerNumbers.map(() => Team.White),
              content() {
                if (player.team !== Team.White) {
                  return t('chatRoom.noAccessToOpponentChatRoom');
                }

                const userMessages = filterUserMessages(
                  messagesByRoom[ChatRoom.White].slice(RECENT_MESSAGES_COUNT),
                );

                return (
                  last(userMessages)?.content?.trim() ||
                  t('chatRoom.emptyContent')
                );
              },
              hasAccess:
                player.team === Team.White ||
                player.status === PlayerStatus.Eliminated,
              onClick() {
                if (
                  player.status === PlayerStatus.Invalid ||
                  (player.status === PlayerStatus.Alive &&
                    player.team !== Team.White)
                ) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.White);
              },
            },
            // Black Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.black`),
              groupImages: blackPlayerNumbers.map(() => Team.Black),
              content() {
                if (player.team !== Team.Black) {
                  return t('chatRoom.noAccessToOpponentChatRoom');
                }

                const userMessages = filterUserMessages(
                  messagesByRoom[ChatRoom.Black].slice(RECENT_MESSAGES_COUNT),
                );

                return (
                  last(userMessages)?.content?.trim() ||
                  t('chatRoom.emptyContent')
                );
              },
              hasAccess:
                player.team === Team.Black ||
                player.status === PlayerStatus.Eliminated,
              onClick() {
                if (
                  player.status === PlayerStatus.Invalid ||
                  (player.status === PlayerStatus.Alive &&
                    player.team !== Team.Black)
                ) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Black);
              },
            },
            // Red Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.red`),
              groupImages: redPlayerNumbers.map(() => Team.Red),
              content() {
                if (player.team !== Team.Red) {
                  return t('chatRoom.noAccessToOpponentChatRoom');
                }

                const userMessages = filterUserMessages(
                  messagesByRoom[ChatRoom.Red].slice(RECENT_MESSAGES_COUNT),
                );

                return (
                  last(userMessages)?.content?.trim() ||
                  t('chatRoom.emptyContent')
                );
              },
              hasAccess:
                player.team === Team.Red ||
                player.status === PlayerStatus.Eliminated,
              onClick() {
                if (
                  player.status === PlayerStatus.Invalid ||
                  (player.status === PlayerStatus.Alive &&
                    player.team !== Team.Red)
                ) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Red);
              },
            },
            // Personal Chat Room (Other players)
            ...Object.values(PlayerNumber)
              .filter(
                (number) =>
                  isValidPlayerNumber(Number(number)) &&
                  player.number !== number,
              )
              .map<ChatRoomProps>((_playerNumber) => {
                const playerNumber = convertToPlayerNumber(_playerNumber);
                const hasAccess = player.status === PlayerStatus.Alive;

                const userMessages = filterUserMessages(
                  messagesByRoom[convertToPersonalChatRoom(playerNumber)].slice(
                    -10,
                  ),
                );

                return {
                  type: 'personal',
                  title: t(`chatRoomType.${playerNumber}`),
                  content:
                    last(userMessages)?.content?.trim() ||
                    t('chatRoom.emptyContent'),
                  isSpy: otherPlayers[playerNumber].isSpy,
                  image: otherPlayers[playerNumber].team,
                  hasAccess,
                  onClick() {
                    if (!hasAccess) {
                      return;
                    }

                    onClose();
                    setCurrentChatRoom(convertToPersonalChatRoom(playerNumber));
                  },
                };
              }),
            // Eliminated User Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.eliminated`),
              groupImages: eliminatedPlayerNumbers.map(
                (playerNumber) =>
                  otherPlayers[convertToPlayerNumber(playerNumber)].team,
              ),
              content() {
                if (player.status !== PlayerStatus.Eliminated) {
                  return t('chatRoom.noAccessToEliminatedChatRoom');
                }

                const userMessages = filterUserMessages(
                  messagesByRoom[ChatRoom.Eliminated].slice(
                    RECENT_MESSAGES_COUNT,
                  ),
                );

                return (
                  last(userMessages)?.content?.trim() ||
                  t('chatRoom.emptyContent')
                );
              },
              hasAccess: player.status === PlayerStatus.Eliminated,
              onClick() {
                if (player.status !== PlayerStatus.Eliminated) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Eliminated);
              },
            } as ChatRoomProps,
          ])}
          onClose={onClose}
          onExit={noop}
          onNotificationClick={noop}
        />
      </Transition>

      <div
        className={cn(
          'bg-gray-1/50 pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300',
          isVisible && 'pointer-events-auto opacity-100',
          overlayClassName,
        )}
        onClick={onClose}
      />
    </>
  );
};

export default ChatRoomListSidebar;
