import usePlayerGameInfo, {
  type PlayerGameInfo,
} from '@/hooks/game/usePlayerGameInfo';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { PlayerStatus } from '@/types/game';
import { convertToTeamChatRoom } from '@/utils/chat';
import { useTranslations } from 'next-intl';

const usePlayerGameInfoHandler = ({ enabled }: { enabled: boolean }) => {
  const t = useTranslations('roomRoute.chatMessage');

  const { user } = useUser();
  const { setPlaying, setCurrentChatRoom, broadcastMessage } = useRoom();
  const { setPlayer } = useGame();

  usePlayerGameInfo({
    variables: {
      username: user.name,
    },
    enabled,
    onPlayerInfo: handlePlayerGameInfo,
  });

  function handlePlayerGameInfo({ id, player, sendTime }: PlayerGameInfo) {
    setPlaying(true);
    setCurrentChatRoom(convertToTeamChatRoom(player.teamColor));
    setPlayer({
      team: player.teamColor,
      number: player.number,
      status: player.eliminated ? PlayerStatus.Eliminated : PlayerStatus.Alive,
      money: player.money,
      isSpy: player.spy,
    });

    const myTeamRoom = convertToTeamChatRoom(player.teamColor);

    broadcastMessage([ChatRoom.General, ChatRoom.Personal, myTeamRoom], {
      id,
      sendTime: sendTime,
      type: ChatMessageType.System,
      sender: ChatMessageType.System,
      content: t('teamColorSystemMessage', {
        teamColor: player.teamColor,
      }),
    });
  }
};

export default usePlayerGameInfoHandler;
