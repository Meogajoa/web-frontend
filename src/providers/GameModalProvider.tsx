import DayOrNightNoticeModal from '@/components/BrandModal/DayOrNightNoticeModal';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { GameModal, GameTime, PlayerStatus } from '@/types/game';
import { convertToTeamChatRoom } from '@/utils/chat';
import React from 'react';

const GameModalProvider: React.FC = () => {
  const { setCurrentChatRoom } = useRoom();
  const { modalVisible, time, player, setModalVisible } = useGame();

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
};

export default GameModalProvider;
