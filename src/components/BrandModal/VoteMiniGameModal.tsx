import { BrandModal, type BrandModalProps } from '@/components/BrandModal';
import { PlayerVote } from '@/components/PlayerVote';
import { type Player, type PlayerNumber } from '@/types/game';
import { type Nullable } from '@/types/misc';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = Pick<BrandModalProps, 'onClose' | 'visible'> & {
  className?: string;
  availableVoteCount: number;
  players: Record<PlayerNumber, Player>;
  voteResult: Record<PlayerNumber, number>;
  onVote: (playerNumber: PlayerNumber) => void;
  onCancel: (playerNumber: PlayerNumber) => void;
};

const VoteMiniGameModal: React.FC<Props> = ({
  className,
  visible,
  availableVoteCount,
  players,
  voteResult,
  onVote,
  onCancel,
  onClose: handleClose,
}) => {
  const t = useTranslations('voteMiniGameModal');
  const [selectedPlayerNumber, setSelectedPlayerNumber] =
    React.useState<Nullable<PlayerNumber>>(null);

  return (
    <BrandModal
      className={cn('', className)}
      visible={visible}
      onClose={handleClose}
    >
      <BrandModal.Header>
        <BrandModal.Title label={t('title')} />
        <BrandModal.CloseButton onClose={handleClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body>
        <h3 className="text-red text-center font-bold">
          {t('availableVoteCount', { voteCount: availableVoteCount })}
        </h3>

        <div className="mt-4.5 grid grid-cols-3 grid-rows-3">
          {Object.values(players).map((player, index) => (
            <PlayerVote
              className={cn(
                'hover:bg-gray-5 rounded-lg px-3 py-2 transition-colors duration-500',
                player.number === selectedPlayerNumber && 'bg-gray-5',
              )}
              key={index}
              playerNumber={player.number}
              username={t('playerUsername', { playerNumber: player.number })}
              voteCount={voteResult[player.number]}
              color={player.team}
              onClick={handlePlayerClick(player.number)}
            />
          ))}
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button
          className="flex-1"
          kind="no"
          disabled={!selectedPlayerNumber}
          onClick={handleCancel(selectedPlayerNumber)}
        >
          {t('cancelButton')}
        </BrandModal.Button>
        <BrandModal.Button
          className="flex-1"
          kind="yes"
          disabled={!selectedPlayerNumber}
          onClick={handleVote(selectedPlayerNumber)}
        >
          {t('voteButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );

  function handlePlayerClick(playerNumber: PlayerNumber) {
    return () => {
      setSelectedPlayerNumber(playerNumber);
    };
  }

  function handleVote(playerNumber: Nullable<PlayerNumber>) {
    return () => {
      if (playerNumber === null) {
        return;
      }

      onVote(playerNumber);
    };
  }

  function handleCancel(playerNumber: Nullable<PlayerNumber>) {
    return () => {
      if (playerNumber === null) {
        return;
      }

      onCancel(playerNumber);
    };
  }
};

export default VoteMiniGameModal;
