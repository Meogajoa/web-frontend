import { Team } from '~/types/game';
import { cn } from '~/utils/classname';
import SelectButtonAndList from './SelectButtonAndList';

export type Selection = {
  number: number;
  team: Team;
};

type Props = {
  className?: string;
  selectButtons: {
    prize: number;
    whoHasSelected: Selection[];
    isSelect: boolean;
    color: Team;
  }[];
};

const ButtonGame: React.FC<Props> = ({ className, selectButtons }) => {
  return (
    <div className={cn('flex w-fit flex-col items-center', className)}>
      <p className="text-gray-1 flex text-base font-bold">
        가장 많이 선택된 버튼은 상금을 받을 수 없습니다.
      </p>
      <div className="mt-6 flex gap-4">
        {selectButtons.map((data, index) => (
          <SelectButtonAndList
            key={index}
            prize={data.prize}
            whoIsSelect={data.whoHasSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonGame;
