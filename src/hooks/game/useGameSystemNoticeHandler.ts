import useGameSystemNotice, {
  type DayOrNightNotice,
  type MiniGameWillEndNotice,
  type MiniGameWillStartNotice,
  type VoteGameStatusNotice,
} from '@/hooks/game/useGameSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { GameModal, GameTime, MiniGame } from '@/types/game';
import { type Nullable } from '@/types/misc';
import { assert } from '@/utils/assert';
import { convertToTeamChatRoom } from '@/utils/chat';
import { dayjs } from '@/utils/date';
import { useTranslations } from 'next-intl';
import React from 'react';

const useGameSystemNoticeHandler = ({
  enabled,
  onGameEnd: handleGameEnd,
}: {
  enabled: boolean;
  onGameEnd?: () => void;
}) => {
  const miniGameEndTimeoutRef = React.useRef<Nullable<NodeJS.Timeout>>(null);
  const { id, broadcastMessage } = useRoom();
  const {
    player,
    miniGame,
    setMiniGame,
    setModalVisible,
    setPlayingMiniGame,
    setTime,
    setNthDay,
    setScheduledTime,
  } = useGame();
  const t = useTranslations('roomRoute.chatMessage');

  useGameSystemNotice({
    variables: { id },
    enabled,
    onDayOrNight: handleGameDayOrNight,
    onGameEnd: handleGameEnd,
    onMiniGameWillStart: handleMiniGameWillStart,
    onMiniGameWillEnd: handleMiniGameWillEnd,
    onVoteGameStatus: handleVoteGameStatus,
  });

  function handleGameDayOrNight(gameDayOrNightNotice: DayOrNightNotice) {
    setTime(gameDayOrNightNotice.dayOrNight);
    setNthDay(gameDayOrNightNotice.day);

    if (gameDayOrNightNotice.day === 0) {
      return;
    }

    assert(gameDayOrNightNotice.sendTime, 'SendTime should be defined');

    setModalVisible(GameModal.DayOrNightNotice);
    broadcastMessage([ChatRoom.Personal, convertToTeamChatRoom(player.team)], {
      id: gameDayOrNightNotice.id,
      type: ChatMessageType.System,
      sender: gameDayOrNightNotice.sender,
      sendTime: gameDayOrNightNotice.sendTime,
      content:
        gameDayOrNightNotice.dayOrNight === GameTime.Day
          ? t('daySystemMessage')
          : t('nightSystemMessage'),
    });
  }

  function handleMiniGameWillStart(
    miniGameWillStartNotice: MiniGameWillStartNotice,
  ) {
    const scheduledTime = dayjs.utc(miniGameWillStartNotice.scheduledTime);
    const currentTime = dayjs.utc();
    const delay = Math.max(0, scheduledTime.diff(currentTime));

    if (
      miniGameWillStartNotice.miniGameType === MiniGame.ReVote &&
      miniGameEndTimeoutRef.current
    ) {
      console.debug(
        `${miniGameWillStartNotice.miniGameType} delay end - mini game is starting`,
      );
      clearTimeout(miniGameEndTimeoutRef.current);
      miniGameEndTimeoutRef.current = null;
    }

    console.debug(
      `${miniGameWillStartNotice.miniGameType} schedule time delay - mini game will start in`,
      delay,
    );
    setTimeout(() => {
      console.debug(
        `${miniGameWillStartNotice.miniGameType} delay end - mini game is starting`,
      );

      switch (miniGameWillStartNotice.miniGameType) {
        case MiniGame.ButtonClick:
          // FIXME: Implement button click mini game
          break;
        case MiniGame.Vote:
        case MiniGame.ReVote:
          setPlayingMiniGame(MiniGame.Vote);
          break;
        default:
          break;
      }
    }, delay);
  }

  function handleMiniGameWillEnd(miniGameWillEndNotice: MiniGameWillEndNotice) {
    const scheduledTime = dayjs.utc(miniGameWillEndNotice.scheduledTime);
    const currentTime = dayjs.utc();
    const delay = Math.max(0, scheduledTime.diff(currentTime));

    if (
      miniGameWillEndNotice.miniGameType === MiniGame.Vote ||
      miniGameWillEndNotice.miniGameType === MiniGame.ReVote
    ) {
      setScheduledTime(scheduledTime.toDate());
      setModalVisible(null);
    }

    console.debug(
      `${miniGameWillEndNotice.miniGameType} schedule time delay - mini game will end in`,
      delay,
    );
    miniGameEndTimeoutRef.current = setTimeout(() => {
      console.debug(
        `${miniGameWillEndNotice.miniGameType} delay end - mini game is ending`,
      );

      switch (miniGameWillEndNotice.miniGameType) {
        case MiniGame.ButtonClick:
          // FIXME: Implement button click mini game
          break;
        case MiniGame.Vote:
          setPlayingMiniGame(null);
          setModalVisible(null);
          break;
        default:
          break;
      }

      miniGameEndTimeoutRef.current = null;
    }, delay);
  }

  function handleVoteGameStatus(voteGameStatusNotice: VoteGameStatusNotice) {
    setMiniGame({
      vote: {
        ...miniGame.vote,
        result: { ...voteGameStatusNotice.result },
      },
    });
  }
};

export default useGameSystemNoticeHandler;
