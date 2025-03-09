import useSubscription from '@/hooks/stomp/useSubscription';
import { GameTime, MiniGame, playerNumberSchema } from '@/types/game';
import { compact } from 'lodash-es';
import { z } from 'zod';

/**
 * Notice Type
 */
enum NoticeType {
  GameDayOrNight = 'GAME_DAY_OR_NIGHT',
  MiniGameWillStartNotice = 'MINI_GAME_WILL_START_NOTICE',
  MiniGameWillEndNotice = 'MINI_GAME_WILL_END_NOTICE',
  ButtonGameStatus = 'BUTTON_GAME_STATUS',
  VoteGameStatus = 'VOTE_GAME_STATUS',
  VoteResult = 'VOTE_RESULT',
  GameEnd = 'GAME_END',
}
const NoticeTypeSchema = z.nativeEnum(NoticeType);

/**
 * Base Notice
 */
const BaseNoticeSchema = z.object({
  type: NoticeTypeSchema,
  id: z.string(),
  sender: z.literal('SYSTEM'),
});

/**
 * GAME_DAY_OR_NIGHT
 */
const dayOrNightNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  type: z.literal(NoticeType.GameDayOrNight),
  day: z.number(),
  dayOrNight: z.nativeEnum(GameTime),
});
export type DayOrNightNotice = z.infer<typeof dayOrNightNoticeSchema>;

/**
 * MINI_GAME_WILL_START_NOTICE
 */
const miniGameWillStartNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  miniGameType: z.nativeEnum(MiniGame),
  scheduledTime: z
    .union([z.string(), z.date()])
    .transform((date) => new Date(date)),
});
export type MiniGameWillStartNotice = z.infer<
  typeof miniGameWillStartNoticeSchema
>;

/**
 * MINI_GAME_WILL_END_NOTICE
 */
const miniGameWillEndNoticeSchema = miniGameWillStartNoticeSchema;
export type MiniGameWillEndNotice = z.infer<typeof miniGameWillEndNoticeSchema>;

/**
 * BUTTON_GAME_STATUS
 */
const buttonGameStatusNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z
    .union([z.string(), z.date()])
    .transform((date) => new Date(date))
    .optional(),
  twentyButtons: z.array(playerNumberSchema),
  fiftyButtons: z.array(playerNumberSchema),
  hundredButtons: z.array(playerNumberSchema),
});
export type ButtonGameStatusNotice = z.infer<
  typeof buttonGameStatusNoticeSchema
>;

/**
 * VOTE_GAME_STATUS
 */
const voteGameStatusNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z
    .union([z.string(), z.date()])
    .transform((date) => new Date(date))
    .optional(),
  result: z.record(
    z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9']),
    z.number(),
  ),
});
export type VoteGameStatusNotice = z.infer<typeof voteGameStatusNoticeSchema>;

/**
 * VOTE_RESULT
 */
const voteResultNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  eliminatedId: playerNumberSchema.array(),
  surviveCount: playerNumberSchema,
});
export type VoteResultNotice = z.infer<typeof voteResultNoticeSchema>;

/**
 * GAME_END
 */
const gameEndNoticeSchema = BaseNoticeSchema.extend({
  sendTime: z.union([z.string(), z.date()]).transform((date) => new Date(date)),
  type: z.literal(NoticeType.GameEnd),
  content: z.string(),
});
export type GameEndNotice = z.infer<typeof gameEndNoticeSchema>;

const useGameSystemNotice = ({
  variables,
  enabled,
  onDayOrNight,
  onMiniGameWillStart,
  onMiniGameWillEnd,
  onButtonGameStatus,
  onVoteGameStatus,
  onVoteResult,
  onGameEnd,
}: {
  variables: { id: string };
  enabled: boolean;
  onDayOrNight?: (gameDayOrNightNotice: DayOrNightNotice) => void;
  onMiniGameWillStart?: (
    miniGameWillStartNotice: MiniGameWillStartNotice,
  ) => void;
  onMiniGameWillEnd?: (miniGameWillEndNotice: MiniGameWillEndNotice) => void;
  onButtonGameStatus?: (buttonGameStatusNotice: ButtonGameStatusNotice) => void;
  onVoteGameStatus?: (voteGameStatusNotice: VoteGameStatusNotice) => void;
  onVoteResult?: (voteResultNotice: VoteResultNotice) => void;
  onGameEnd?: (gameEndNotice: GameEndNotice) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/game/${variables.id}/notice/system`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      console.debug(`/topic/game/${variables.id}/notice/system: `, jsonBody);

      const baseNotice = BaseNoticeSchema.parse(jsonBody);

      switch (baseNotice.type) {
        case NoticeType.GameDayOrNight:
          const gameDayOrNightNotice = dayOrNightNoticeSchema.parse(jsonBody);
          onDayOrNight?.(gameDayOrNightNotice);
          break;
        case NoticeType.MiniGameWillStartNotice:
          const miniGameWillStartNotice =
            miniGameWillStartNoticeSchema.parse(jsonBody);
          onMiniGameWillStart?.(miniGameWillStartNotice);
          break;
        case NoticeType.MiniGameWillEndNotice:
          const miniGameWillEndNotice =
            miniGameWillEndNoticeSchema.parse(jsonBody);
          onMiniGameWillEnd?.(miniGameWillEndNotice);
          break;
        case NoticeType.ButtonGameStatus:
          const buttonGameStatusNotice =
            buttonGameStatusNoticeSchema.parse(jsonBody);
          onButtonGameStatus?.(buttonGameStatusNotice);
          break;
        case NoticeType.VoteGameStatus:
          const voteGameStatusNotice =
            voteGameStatusNoticeSchema.parse(jsonBody);
          onVoteGameStatus?.(voteGameStatusNotice);
          break;
        case NoticeType.VoteResult:
          const voteResultNotice = voteResultNoticeSchema.parse(jsonBody);
          onVoteResult?.(voteResultNotice);
          break;
        case NoticeType.GameEnd:
          const gameEndNotice = gameEndNoticeSchema.parse(jsonBody);
          onGameEnd?.(gameEndNotice);
          break;
      }
    },
  );
};

export default useGameSystemNotice;
