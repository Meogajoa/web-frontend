import {
  type ChatMessage,
  ChatMessageType,
  ChatRoom,
  type PersonalChatMessage,
} from '@/types/chat';
import { PlayerNumber, Team } from '@/types/game';
import { assert } from '@/utils/assert';
import { convertToPlayerNumber, isValidPlayerNumber } from '@/utils/game';

export const isTeam = (image: string | Team): image is Team => {
  return Object.values(Team).includes(image as Team);
};

export const convertToPersonalChatRoom = (playerNumber: number): ChatRoom => {
  assert(
    isValidPlayerNumber(playerNumber),
    `Invalid player number: ${playerNumber}`,
  );

  switch (playerNumber) {
    case PlayerNumber.One:
      return ChatRoom.Player01;
    case PlayerNumber.Two:
      return ChatRoom.Player02;
    case PlayerNumber.Three:
      return ChatRoom.Player03;
    case PlayerNumber.Four:
      return ChatRoom.Player04;
    case PlayerNumber.Five:
      return ChatRoom.Player05;
    case PlayerNumber.Six:
      return ChatRoom.Player06;
    case PlayerNumber.Seven:
      return ChatRoom.Player07;
    case PlayerNumber.Eight:
      return ChatRoom.Player08;
    case PlayerNumber.Nine:
      return ChatRoom.Player09;
    default:
      return ChatRoom.Personal;
  }
};

export const getPersonalChatRoomFromMessage = (
  message: PersonalChatMessage,
  playerNumber: PlayerNumber,
): ChatRoom => {
  const receiverNumber = convertToPlayerNumber(message.receiver);
  const senderNumber = convertToPlayerNumber(message.sender);

  return convertToPersonalChatRoom(
    receiverNumber === playerNumber ? senderNumber : receiverNumber,
  );
};

export const isPersonalChatRoom = (chatRoom: ChatRoom) => {
  return (
    chatRoom === ChatRoom.Player01 ||
    chatRoom === ChatRoom.Player02 ||
    chatRoom === ChatRoom.Player03 ||
    chatRoom === ChatRoom.Player04 ||
    chatRoom === ChatRoom.Player05 ||
    chatRoom === ChatRoom.Player06 ||
    chatRoom === ChatRoom.Player07 ||
    chatRoom === ChatRoom.Player08 ||
    chatRoom === ChatRoom.Player09 ||
    chatRoom === ChatRoom.Personal
  );
};

export const convertToTeamChatRoom = (team: Team) => {
  switch (team) {
    case Team.Black:
      return ChatRoom.Black;
    case Team.White:
      return ChatRoom.White;
    case Team.Red:
    default:
      return ChatRoom.Red;
  }
};

export const filterUserMessages = (messages: ChatMessage[]) => {
  return messages.filter((message) => message.type === ChatMessageType.Chat);
};
