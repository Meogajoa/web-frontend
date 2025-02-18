import { useState } from 'react';
import { Selection } from '~/components/ButtonGame/ButtonGame';
import GameBoard from '~/components/Game/GameBoard';
import GameIcon from '~/svgs/GameIcon';
import { Team } from '~/types/game';
import { cn } from '~/utils/classname';

export type Props = {
  className?: string;
  hasNotice?: boolean;
  gameType: 'Button';
  gameData: {
    selectButtons: {
      prize: number;
      whoHasSelected: Selection[];
      isSelect: boolean;
      color: Team;
    }[];
  };
};

const GameButton: React.FC<Props> = ({
  className,
  hasNotice,
  gameType,
  gameData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn(className)} onClick={() => setIsOpen(true)}>
      {hasNotice && (
        <div className="bg-red absolute right-[0.313rem] top-[0.313rem] size-2.5 rounded-full" />
      )}
      <GameIcon />
      {isOpen && gameType === 'Button' && (
        <GameBoard
          gameType={gameType}
          gameData={gameData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GameButton;
