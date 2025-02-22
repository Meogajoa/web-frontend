import useSubscription from '@/hooks/stomp/useSubscription';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { defaultInitState } from '@/stores/room';
import {
  baseChatMessageSchema,
  chatLogsSchema,
  ChatMessageType,
  ChatRoom,
  personalChatLogsSchema,
  personalChatMessageSchema,
  type ChatMessage,
} from '@/types/chat';
import { PlayerStatus, Team } from '@/types/game';
import {
  convertToPersonalChatRoom,
  getPersonalChatRoomFromMessage,
  isPersonalChatRoom,
} from '@/utils/chat';
import { isValidPlayerNumber } from '@/utils/game';
import { compact } from 'lodash-es';
import { z } from 'zod';

enum XChatRoom {
  Lobby = 'LOBBY',
  Personal = 'PERSONAL',
  General = 'GENERAL',
  Black = 'BLACK',
  White = 'WHITE',
  Red = 'RED',
  Eliminated = 'ELIMINATED',
}
const xChatRoomSchema = z.nativeEnum(XChatRoom);

enum XLogType {
  PersonalSingle = 'PERSONAL_SINGLE',
  PersonalHistory = 'PERSONAL_HISTORY',
  Single = 'SINGLE',
  History = 'HISTORY',
}
const xLogTypeSchema = z.nativeEnum(XLogType);

const useChatMessages = ({
  variables,
  onNewMessage,
}: {
  variables: {
    chatRoom: ChatRoom;
  };
  onNewMessage?: (message: ChatMessage) => void;
}) => {
  const { user } = useUser();
  const { id, messagesByRoom, playing, addMessage, addMessages } = useRoom();
  const { player } = useGame();

  useSubscription(
    compact([
      // Room lobby
      !playing && `/topic/room/${id}/chat`,

      // In-game general
      playing && `/topic/game/${id}/chat`,

      // In-game black
      playing &&
        (player.team === Team.Black ||
          player.status === PlayerStatus.Eliminated) &&
        `/topic/game/${id}/chat/black`,

      // In-game white
      playing &&
        (player.team === Team.White ||
          player.status === PlayerStatus.Eliminated) &&
        `/topic/game/${id}/chat/white`,

      // In-game red
      playing &&
        (player.team === Team.Red ||
          player.status === PlayerStatus.Eliminated) &&
        `/topic/game/${id}/chat/red`,

      // In-game eliminated
      playing &&
        player.status === PlayerStatus.Eliminated &&
        `/topic/game/${id}/chat/eliminated`,

      // In-game personal
      playing &&
        player.status === PlayerStatus.Alive &&
        `/topic/user/${user.name}/gameChat`,
    ]),
    ({ headers, body }) => {
      const jsonBody = JSON.parse(body);
      const xChatRoomHeader = xChatRoomSchema.parse(headers['x-chat-room']);
      const xLogTypeHeader = xLogTypeSchema.parse(headers['x-log-type']);

      console.debug(
        `x-chat-room: ${xChatRoomHeader}\n`,
        `x-log-type: ${xLogTypeHeader}\n`,
        jsonBody,
      );

      switch (xLogTypeHeader) {
        case XLogType.History: {
          const history = chatLogsSchema.parse(jsonBody);
          history.chatLogs = history.chatLogs.map((message) => ({
            ...message,
            type: ChatMessageType.Chat,
          }));

          const chatRoom = convertXChatRoomToChatRoom(xChatRoomHeader);
          addMessages(chatRoom, history.chatLogs as ChatMessage[]);
          break;
        }
        case XLogType.PersonalHistory: {
          const history = personalChatLogsSchema.parse(jsonBody);
          history.personalChatLogs?.sort(
            (a, b) => a.sendTime.getTime() - b.sendTime.getTime(),
          );

          const newMessagesMap = { ...defaultInitState.messagesByRoom };

          history.personalChatLogs?.forEach((_message) => {
            const message = { ..._message, type: ChatMessageType.Chat };
            const chatRoom = getPersonalChatRoomFromMessage(
              message,
              player.number,
            );
            newMessagesMap[chatRoom].push(message);
          });

          Object.entries(newMessagesMap).forEach(([_chatRoom, messages]) => {
            if (!isValidPlayerNumber(Number(_chatRoom))) {
              return;
            }

            const chatRoom = convertToPersonalChatRoom(Number(_chatRoom));
            if (!isPersonalChatRoom(chatRoom)) {
              return;
            }

            addMessages(chatRoom, messages);
          });

          break;
        }
        case XLogType.Single: {
          const message = {
            ...baseChatMessageSchema.parse(jsonBody),
            type: ChatMessageType.Chat,
          };

          const chatRoom = convertXChatRoomToChatRoom(xChatRoomHeader);
          addMessage(chatRoom, message);
          setTimeout(() => onNewMessage?.(message), 0);
          break;
        }
        case XLogType.PersonalSingle: {
          const personalMessage = {
            ...personalChatMessageSchema.parse(jsonBody),
            type: ChatMessageType.Chat,
          };

          const chatRoom = getPersonalChatRoomFromMessage(
            personalMessage,
            player.number,
          );
          addMessage(chatRoom, personalMessage);
          setTimeout(() => onNewMessage?.(personalMessage), 0);
          break;
        }
      }
    },
  );

  return messagesByRoom[variables.chatRoom];
};

const convertXChatRoomToChatRoom = (xChatRoom: XChatRoom): ChatRoom => {
  switch (xChatRoom) {
    case XChatRoom.Lobby:
      return ChatRoom.Lobby;
    case XChatRoom.General:
      return ChatRoom.General;
    case XChatRoom.Black:
      return ChatRoom.Black;
    case XChatRoom.White:
      return ChatRoom.White;
    case XChatRoom.Red:
      return ChatRoom.Red;
    case XChatRoom.Eliminated:
      return ChatRoom.Eliminated;
    case XChatRoom.Personal:
    default:
      return ChatRoom.Personal;
  }
};

export default useChatMessages;
