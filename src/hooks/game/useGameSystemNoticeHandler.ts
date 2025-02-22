import useGameSystemNotice, {
  type DayOrNightNotice,
  type MiniGameWillStartNotice,
} from '@/hooks/game/useGameSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { GameModal, GameTime, MiniGame } from '@/types/game';
import { assert } from '@/utils/assert';
import { convertToTeamChatRoom } from '@/utils/chat';
import { dayjs } from '@/utils/date';
import { uniqueId } from 'lodash-es';
import { useTranslations } from 'next-intl';

const useGameSystemNoticeHandler = ({
  enabled,
  onGameEnd: handleGameEnd,
}: {
  enabled: boolean;
  onGameEnd?: () => void;
}) => {
  const { id, broadcastMessage } = useRoom();
  const { player, setModalVisible, setTime, setNthDay } = useGame();
  const t = useTranslations('roomRoute.chatMessage');

  useGameSystemNotice({
    variables: { id },
    enabled,
    onDayOrNight: handleGameDayOrNight,
    onGameEnd: handleGameEnd,
    onMiniGameWillStart: handleMiniGameWillStart,
  });

  function handleGameDayOrNight(gameDayOrNightNotice: DayOrNightNotice) {
    setTime(gameDayOrNightNotice.dayOrNight);
    setNthDay(gameDayOrNightNotice.day);

    if (gameDayOrNightNotice.day === 0) {
      return;
    }

    assert(gameDayOrNightNotice.sendTime, 'SendTime should be defined');
    setModalVisible(GameModal.DayOrNightNotice);

    if (gameDayOrNightNotice.dayOrNight === GameTime.Day) {
      broadcastMessage(
        [ChatRoom.Personal, convertToTeamChatRoom(player.team)],
        {
          // id: gameDayOrNightNotice.id,
          id: uniqueId(), // FIXME: use server id
          type: ChatMessageType.System,
          sender: gameDayOrNightNotice.sender,
          // sendTime: gameDayOrNightNotice.sendTime,
          sendTime: new Date(), // FIXME: use server time
          content: t('daySystemMessage'),
        },
      );
    }
  }

  function handleMiniGameWillStart(
    miniGameWillStartNotice: MiniGameWillStartNotice,
  ) {
    const scheduledTime = dayjs.utc(miniGameWillStartNotice.scheduledTime);
    const currentTime = dayjs.utc();
    const delay = Math.max(0, scheduledTime.diff(currentTime));
    console.debug('Schedule time delay', delay);

    setTimeout(() => {
      console.debug('delay end!! should start mini game');

      switch (miniGameWillStartNotice.miniGameType) {
        case MiniGame.ButtonClick:
          // FIXME: Implement button click mini game
          break;
        case MiniGame.Vote:
          // FIXME: Implement vote mini game
          break;
        default:
          break;
      }
    }, delay);
  }
};

export default useGameSystemNoticeHandler;
