import { PlayerNumber, playerNumberSchema } from '@/types/game';
import { usernameSchema } from '@/types/user';
import { z } from 'zod';

/**
 * Chat Room Kind
 */
export enum ChatRoom {
  Player01 = PlayerNumber.One,
  Player02 = PlayerNumber.Two,
  Player03 = PlayerNumber.Three,
  Player04 = PlayerNumber.Four,
  Player05 = PlayerNumber.Five,
  Player06 = PlayerNumber.Six,
  Player07 = PlayerNumber.Seven,
  Player08 = PlayerNumber.Eight,
  Player09 = PlayerNumber.Nine,
  Lobby = 'lobby',
  Personal = 'personal',
  General = 'general',
  Black = 'black',
  White = 'white',
  Red = 'red',
  Eliminated = 'eliminated',
}

/**
 * Chat Message
 */
export const baseChatMessageSchema = z.object({
  id: z.string(),
  content: z.string().optional(),
  sender: usernameSchema.or(
    playerNumberSchema.transform((number) => number.toString()),
  ),
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
});

export enum ChatMessageType {
  Chat = 'CHAT',
  System = 'SYSTEM',
}

export type ChatMessage = z.infer<typeof baseChatMessageSchema> & {
  type: ChatMessageType;
};

export const chatLogsSchema = z.object({
  type: z.literal('CHAT_LOGS'),
  id: z.string(),
  chatLogs: z.array(baseChatMessageSchema),
});

export const personalChatMessageSchema = baseChatMessageSchema.extend({
  receiver: usernameSchema,
});
export type PersonalChatMessage = z.infer<typeof personalChatMessageSchema>;

export const personalChatLogsSchema = z.object({
  type: z.literal('PERSONAL_CHAT_LOGS'),
  id: z.string(),
  receiver: usernameSchema,
  personalChatLogs: z.array(personalChatMessageSchema),
});
