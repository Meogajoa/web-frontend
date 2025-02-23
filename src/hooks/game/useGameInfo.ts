import { usernameSchema } from '@/types/account';
import { teamColorSchema } from '@/types/game';
import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

const userGameInfoSchema = z.object({
  number: z.number(),
  nickname: usernameSchema,
  teamColor: teamColorSchema,
  money: z.number(),
  spy: z.boolean(),
  eliminated: z.boolean(),
});
export type UserGameInfo = z.infer<typeof userGameInfoSchema>;

const useUserGameInfo = ({
  variables: { username },
  enabled,
  onMessage,
}: {
  variables: { username: string };
  enabled: boolean;
  onMessage: (gameInfo: UserGameInfo) => void;
}) => {
  useSubscription(
    compact([enabled && `/topic/user/${username}/gameInfo`]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      const gameInfo = userGameInfoSchema.parse(jsonBody);
      onMessage(gameInfo);

      console.debug(`/topic/user/${username}/gameInfo: `, gameInfo);
    },
  );
};

export default useUserGameInfo;
