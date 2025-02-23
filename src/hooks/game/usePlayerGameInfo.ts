import useSubscription from '@/hooks/stomp/useSubscription';
import { baseChatMessageSchema } from '@/types/chat';
import { playerNumberSchema, teamSchema } from '@/types/game';
import { usernameSchema } from '@/types/user';
import { compact } from 'lodash-es';
import { z } from 'zod';

/**
 * Game info type
 */
enum GameInfoType {
  PlayerInfo = 'USER_INFO',
  Eliminated = 'ELIMINATED_USER',
  VoteCount = 'AVAILABLE_VOTE_COUNT',
}
const gameInfoTypeSchema = z.nativeEnum(GameInfoType);

/**
 * Base game info schema
 */
const baseGameInfoSchema = baseChatMessageSchema.extend({
  type: gameInfoTypeSchema,
});

/**
 * USER_INFO
 */
const playerGameInfoSchema = baseGameInfoSchema.extend({
  player: z.object({
    number: playerNumberSchema,
    nickname: usernameSchema,
    teamColor: teamSchema,
    money: z.number(),
    spy: z.boolean(),
    eliminated: z.boolean(),
  }),
});
export type PlayerGameInfo = z.infer<typeof playerGameInfoSchema>;

/**
 * ELIMINATED_USER
 */
const eliminatedGameInfoSchema = baseChatMessageSchema.extend({
  nickname: usernameSchema,
});
export type EliminatedGameInfo = z.infer<typeof eliminatedGameInfoSchema>;

/**
 * AVAILABLE_VOTE_COUNT
 */
const availableVoteCountInfoSchema = baseChatMessageSchema.extend({
  availableVoteCount: z.number(),
  userNickname: usernameSchema,
});
export type AvailableVoteCountInfo = z.infer<
  typeof availableVoteCountInfoSchema
>;

const usePlayerGameInfo = ({
  variables: { username },
  enabled,
  onPlayerInfo: onPlayerInfo,
  onEliminated,
  onAvailableVoteCount,
}: {
  variables: { username: string };
  enabled: boolean;
  onPlayerInfo?: (gameInfo: PlayerGameInfo) => void;
  onEliminated?: (gameInfo: EliminatedGameInfo) => void;
  onAvailableVoteCount?: (gameInfo: AvailableVoteCountInfo) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/user/${username}/gameInfo`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      console.debug(`/topic/user/${username}/gameInfo: `, jsonBody);

      const type = gameInfoTypeSchema.parse(jsonBody.type);

      switch (type) {
        case GameInfoType.PlayerInfo: {
          const gameInfo = playerGameInfoSchema.parse(jsonBody);
          onPlayerInfo?.(gameInfo);
          break;
        }
        case GameInfoType.Eliminated: {
          const gameInfo = eliminatedGameInfoSchema.parse(jsonBody);
          onEliminated?.(gameInfo);
          break;
        }
        case GameInfoType.VoteCount: {
          const gameInfo = availableVoteCountInfoSchema.parse(jsonBody);
          onAvailableVoteCount?.(gameInfo);
          break;
        }
      }
    },
  );
};

export default usePlayerGameInfo;
