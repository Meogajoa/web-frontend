import ButtonGame, { Selection } from '~/components/ButtonGame/ButtonGame';
import TopArrowIcon from '~/svgs/TopArrowIcon';
import { Team } from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  gameType: 'Button';
  gameData: {
    selectButtons: {
      prize: number;
      whoHasSelected: Selection[];
      isSelect: boolean;
      color: Team;
    }[];
  };

  onClose: () => void;
};

const GameBoard: React.FC<Props> = ({
  className,
  gameType,
  gameData,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'relative h-fit w-full rounded-lg bg-white px-5.5 py-5 shadow-lg',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <TopArrowIcon className="absolute top-6 right-3" onClick={onClose} />
      {gameType === 'Button' && (
        <ButtonGame selectButtons={gameData.selectButtons} />
      )}
    </div>
  );
};

export default GameBoard;
