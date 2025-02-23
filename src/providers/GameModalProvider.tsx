import DayOrNightNoticeModal from '@/components/BrandModal/DayOrNightNoticeModal';
import VoteMiniGameModal from '@/components/BrandModal/VoteMiniGameModal';
import useStompClient from '@/hooks/stomp/useStompClient';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import {
  GameModal,
  GameTime,
  type PlayerNumber,
  PlayerStatus,
} from '@/types/game';
import { convertToTeamChatRoom } from '@/utils/chat';
import React from 'react';

const GameModalProvider: React.FC = () => {
  const { id, setCurrentChatRoom } = useRoom();
  const {
    modalVisible,
    time,
    player,
    otherPlayers,
    miniGame: { vote },
    setModalVisible,
  } = useGame();
  const stompClient = useStompClient();

  return (
    <>
      <DayOrNightNoticeModal
        visible={
          player.status === PlayerStatus.Alive &&
          modalVisible === GameModal.DayOrNightNotice
        }
        time={time}
        onMove={handleDayOrNightMove}
        onClose={handleClose}
      />
      <VoteMiniGameModal
        visible={
          player.status === PlayerStatus.Alive &&
          modalVisible === GameModal.VoteMiniGame
        }
        availableVoteCount={vote.availableVoteCount}
        players={otherPlayers}
        voteResult={vote.result}
        onVote={handleVote}
        onCancel={handleCancel}
        onClose={handleClose}
      />
    </>
  );

  function handleClose() {
    setModalVisible(null);
  }

  function handleDayOrNightMove() {
    setModalVisible(null);
    if (time === GameTime.Invalid) {
      return;
    }

    setCurrentChatRoom(
      time === GameTime.Day
        ? ChatRoom.General
        : convertToTeamChatRoom(player.team),
    );
  }

  function handleVote(playerNumber: PlayerNumber) {
    stompClient.publishWithDefaults({
      destination: `/app/game/${id}/vote`,
      body: JSON.stringify({
        type: 'VOTE',
        content: playerNumber,
      }),
    });
  }

  function handleCancel(playerNumber: PlayerNumber) {
    stompClient.publishWithDefaults({
      destination: `/app/game/${id}/cancelVote`,
      body: JSON.stringify({
        type: 'CANCEL_VOTE',
        content: playerNumber,
      }),
    });
  }
};

export default GameModalProvider;
