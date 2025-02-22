import { BrandModal, type BrandModalProps } from '@/components/BrandModal';
import { MAX_USERS } from '@/constants/game';
import { type PlayerNumber } from '@/types/game';
import { cn } from '@/utils/classname';
import { range } from 'lodash-es';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = Pick<BrandModalProps, 'onClose' | 'visible'> & {
  className?: string;
  availableVoteCount: number;
  onVote: (playerNumber: PlayerNumber) => void;
  onCancel: (playerNumber: PlayerNumber) => void;
};

const VoteMiniGameModal: React.FC<Props> = ({
  className,
  visible,
  availableVoteCount,
  onVote,
  onCancel,
  onClose: handleClose,
}) => {
  const t = useTranslations('voteMiniGameModal');

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

        <div className="mt-4.5 grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-4">
          {range(MAX_USERS).map((index) => (
            // <VotePlayer key={index} />
            <></>
          ))}
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button kind="no" onClick={handleCancel}>
          {t('cancelButton')}
        </BrandModal.Button>
        <BrandModal.Button kind="yes" onClick={handleVote}>
          {t('voteButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );

  function handleVote() {}
  function handleCancel() {}
};

export default VoteMiniGameModal;
