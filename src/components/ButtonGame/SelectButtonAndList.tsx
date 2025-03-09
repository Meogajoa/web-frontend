import { type Selection } from '@/components/ButtonGame/ButtonGame';
import NumberIconBall from '@/components/GameResultNotice/NumberIconBall';
import { cn } from '@/utils/classname';
import React from 'react';

type Props = {
  className?: string;
  prize: number;
  whoIsSelect: Selection[];
};

const SelectButtonAndList: React.FC<Props> = ({
  className,
  prize,
  whoIsSelect,
}) => {
  const [isSelect, setIsSelect] = React.useState(false);

  const handleClick = () => {
    setIsSelect((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className={cn(
          'w-full rounded-md px-8.5 py-2.5',
          isSelect ? 'bg-gray-2' : 'bg-gray-5',
          className,
        )}
        onClick={handleClick}
      >
        <div className="text-center text-base font-bold text-white">
          <span>₩</span>
          {prize}
        </div>
      </button>

      <div className="mt-2 flex gap-1">
        {whoIsSelect.map((selection, index) => (
          <NumberIconBall
            key={index}
            number={selection.number}
            color={selection.team}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectButtonAndList;
