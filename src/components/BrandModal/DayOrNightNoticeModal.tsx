import { BrandModal, type BrandModalProps } from '@/components/BrandModal';
import { GameTime } from '@/types/game';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = Pick<BrandModalProps, 'onClose' | 'visible'> & {
  time: GameTime;
  onMove?: () => void;
};

const DayOrNightNoticeModal: React.FC<Props> = ({
  time,
  visible,
  onMove,
  onClose,
}) => {
  const t = useTranslations('dayOrNightNoticeModal');

  return (
    <BrandModal onClose={handleClose} visible={visible}>
      <BrandModal.Header>
        <BrandModal.Title label={t('title')} />
        <BrandModal.CloseButton onClose={handleClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body className="px-14 pt-12 text-center whitespace-pre-line">
        <p className="text-lg font-bold text-black">
          {t(time === GameTime.Day ? 'dayDescription' : 'nightDescription')}
        </p>

        {/* FIXME: Need to discuss about this */}
        {/* <p className="text-red mt-3 text-sm font-bold">
          {t(time === GameTime.Day ? 'dayInfo' : 'nightInfo')}
        </p> */}
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button
          className="px-8"
          kind="yes"
          type="button"
          onClick={handleMove}
        >
          {t('moveButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );

  function handleClose() {
    onClose();
  }

  function handleMove() {
    onMove?.();
    onClose();
  }
};

export default DayOrNightNoticeModal;
