import { Team } from '@/types/game';

import useGamePlayersNotice, {
  type GameUsersNotice,
} from '@/hooks/game/useGamePlayersNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatMessageType } from '@/types/chat';
import { PlayerNumber, PlayerStatus } from '@/types/game';
import { convertToTeamChatRoom } from '@/utils/chat';
import { isValidPlayerNumber } from '@/utils/game';
import { useTranslations } from 'next-intl';

const useGamePlayersNoticeHandler = ({ enabled }: { enabled: boolean }) => {
  const t = useTranslations('roomRoute.chatMessage');

  const {
    player,
    setPlayerByPlayerNumber,
    setWhitePlayerNumbers,
    setBlackPlayerNumbers,
    setEliminatedPlayerNumbers,
    setRedPlayerNumbers,
  } = useGame();

  const { id, addMessage } = useRoom();

  useGamePlayersNotice({
    variables: { id },
    enabled,
    onMessage: handleGamePlayersNotice,
  });

  function handleGamePlayersNotice(gameUsersNotice: GameUsersNotice) {
    Object.values(PlayerNumber).forEach((_number) => {
      const number = Number(_number);
      if (!isValidPlayerNumber(number)) {
        return;
      }

      const isBlack = gameUsersNotice.blackTeam.includes(number);
      const isWhite = gameUsersNotice.whiteTeam.includes(number);
      const isEliminated = gameUsersNotice.eliminated.includes(number);

      setPlayerByPlayerNumber(number, {
        status: isEliminated ? PlayerStatus.Eliminated : PlayerStatus.Alive,
        team: isBlack ? Team.Black : isWhite ? Team.White : Team.Red,
        number,
      });
    });

    setWhitePlayerNumbers(gameUsersNotice.whiteTeam);
    setBlackPlayerNumbers(gameUsersNotice.blackTeam);
    setRedPlayerNumbers(gameUsersNotice.redTeam);
    setEliminatedPlayerNumbers(gameUsersNotice.eliminated);

    const myTeamPlayerNumbers =
      player.team === Team.White
        ? gameUsersNotice.whiteTeam
        : player.team === Team.Black
          ? gameUsersNotice.blackTeam
          : gameUsersNotice.redTeam;

    addMessage(convertToTeamChatRoom(player.team), {
      id: gameUsersNotice.id,
      sendTime: new Date(),
      type: ChatMessageType.System,
      sender: ChatMessageType.System,
      content: t('teamChatStartSystemMessage', {
        userNames: myTeamPlayerNumbers
          .map((playerNumber) => t('inGameUsername', { playerNumber }))
          .join(', '),
      }),
    });
  }
};

export default useGamePlayersNoticeHandler;
