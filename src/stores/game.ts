import {
  GameTime,
  PlayerNumber,
  PlayerStatus,
  Team,
  type GameModal,
  type MiniGame,
  type Player,
} from '@/types/game';
import { type Nullable, type Optional } from '@/types/misc';
import { isValidPlayerNumber } from '@/utils/game';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  player: Player;
  otherPlayers: Record<PlayerNumber, Player>;
  time: GameTime;
  scheduleTime: Nullable<Date>;
  nthDay: number;
  whitePlayerNumbers: PlayerNumber[];
  blackPlayerNumbers: PlayerNumber[];
  redPlayerNumbers: PlayerNumber[];
  eliminatedPlayerNumbers: PlayerNumber[];
  modalVisible: Nullable<GameModal>;
  playingMiniGame: Nullable<MiniGame>;
  miniGame: {
    vote: {
      availableVoteCount: number;
      result: Record<PlayerNumber, number>;
    };
  };
};

export type GameActions = {
  setPlayer: (player: Player) => void;
  setPlayerByPlayerNumber: (playerNumber: PlayerNumber, player: Player) => void;
  setTime: (time: GameTime) => void;
  setScheduleTime: (scheduleTime: Nullable<Date>) => void;
  setNthDay: (nthDay: number) => void;
  getTeamPlayers: (team: Optional<Team>) => Player[];
  setWhitePlayerNumbers: (whitePlayerNumbers: PlayerNumber[]) => void;
  setBlackPlayerNumbers: (blackPlayerNumbers: PlayerNumber[]) => void;
  setRedPlayerNumbers: (redPlayerNumbers: PlayerNumber[]) => void;
  setEliminatedPlayerNumbers: (eliminatedPlayerNumbers: PlayerNumber[]) => void;
  setModalVisible: (modalVisible: Nullable<GameModal>) => void;
  setPlayingMiniGame: (playingMiniGame: Nullable<MiniGame>) => void;
  setMiniGame: (miniGame: GameState['miniGame']) => void;
  clearMiniGame: () => void;
  clearGameStore: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  player: {
    team: Team.Invalid,
    number: PlayerNumber.Invalid,
    status: PlayerStatus.Invalid,
  },
  otherPlayers: Object.values(PlayerNumber)
    .map(Number)
    .filter(isValidPlayerNumber)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          team: Team.Invalid,
          number: PlayerNumber.Invalid,
          status: PlayerStatus.Invalid,
        } as Player,
      }),
      {} as Record<PlayerNumber, Player>,
    ),
  time: GameTime.Invalid,
  scheduleTime: null,
  nthDay: 0,
  whitePlayerNumbers: [],
  blackPlayerNumbers: [],
  redPlayerNumbers: [],
  eliminatedPlayerNumbers: [],
  modalVisible: null,
  playingMiniGame: null,
  miniGame: {
    vote: {
      availableVoteCount: 0,
      result: Object.values(PlayerNumber)
        .map(Number)
        .filter(isValidPlayerNumber)
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: 0,
          }),
          {} as Record<PlayerNumber, number>,
        ),
    },
  },
};

export const createGameStore = (initState: GameState = defaultInitState) => {
  return createStore<GameStore>()((set, get) => ({
    ...initState,
    setPlayer(player) {
      set({ player });
    },
    setPlayerByPlayerNumber(playerNumber, player) {
      set((state) => ({
        otherPlayers: {
          ...state.otherPlayers,
          [playerNumber]: player,
        },
      }));
    },
    setTime(time) {
      set({ time });
    },
    setScheduleTime(scheduleTime) {
      set({ scheduleTime });
    },
    setNthDay(nthDay) {
      set({ nthDay });
    },
    getTeamPlayers(team) {
      return Object.values(get().otherPlayers).filter(
        (player) => player.team === (team ?? get().player.team),
      );
    },
    setWhitePlayerNumbers(whitePlayerNumbers) {
      set({ whitePlayerNumbers });
    },
    setBlackPlayerNumbers(blackPlayerNumbers) {
      set({ blackPlayerNumbers });
    },
    setRedPlayerNumbers(redPlayerNumbers) {
      set({ redPlayerNumbers });
    },
    setEliminatedPlayerNumbers(eliminatedPlayerNumbers) {
      set({ eliminatedPlayerNumbers });
    },
    setModalVisible(modalVisible) {
      set({ modalVisible });
    },
    setPlayingMiniGame(playingMiniGame) {
      set({ playingMiniGame });
    },
    setMiniGame(miniGame) {
      set((state) => ({
        miniGame: {
          ...state.miniGame,
          ...miniGame,
        },
      }));
    },
    clearMiniGame() {
      set({
        playingMiniGame: null,
        miniGame: { ...defaultInitState.miniGame },
      });
    },
    clearGameStore() {
      set(defaultInitState);
    },
  }));
};
