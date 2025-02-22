import { z } from 'zod';

export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
  Red = 'RED',
}
export const teamSchema = z.nativeEnum(Team);

export enum PlayerNumber {
  Invalid,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
}
export const playerNumberSchema = z.nativeEnum(PlayerNumber);

export enum PlayerStatus {
  Invalid = 'INVALID',
  Alive = 'ALIVE',
  Eliminated = 'ELIMINATED',
}

export type Player = {
  team: Team;
  number: PlayerNumber;
  status: PlayerStatus;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Day = 'DAY',
}

export enum MiniGame {
  Invalid = 'INVALID',
  ButtonClick = 'BUTTON_CLICK',
  Vote = 'VOTE_GAME',
}

export enum GameModal {
  DayOrNightNotice,
  VoteMiniGame,
}
