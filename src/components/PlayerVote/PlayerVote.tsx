import ProfileImage, {
  type ProfileImageProps,
} from '@/components/ProfileImage/ProfileImage';
import { type Point } from '@/types/misc';
import { type Username } from '@/types/user';
import { cn } from '@/utils/classname';
import { range, shuffle } from 'lodash-es';
import Image from 'next/image';
import React from 'react';

const stampPositions: Readonly<Point[]> = [
  { x: '5%', y: '5%' },
  { x: '15%', y: '10%' },
  { x: '25%', y: '20%' },
  { x: '35%', y: '15%' },
  { x: '45%', y: '25%' },
  { x: '55%', y: '30%' },
  { x: '65%', y: '40%' },
  { x: '75%', y: '35%' },
  { x: '85%', y: '45%' },
  { x: '10%', y: '55%' },
  { x: '20%', y: '65%' },
  { x: '30%', y: '60%' },
  { x: '40%', y: '70%' },
  { x: '50%', y: '75%' },
  { x: '60%', y: '80%' },
  { x: '70%', y: '85%' },
  { x: '80%', y: '90%' },
  { x: '20%', y: '85%' },
  { x: '40%', y: '50%' },
  { x: '60%', y: '55%' },
];

type Props = Pick<
  ProfileImageProps,
  'color' | 'playerNumber' | 'src' | 'onClick'
> & {
  className?: string;
  username: Username;
  voteCount: number;
};

const VotePlayer: React.FC<Props> = ({
  className,
  username,
  voteCount,
  color,
  playerNumber,
  src,
  onClick: handleClick,
}) => {
  const randomStampPosition = React.useMemo(() => shuffle(stampPositions), []);

  return (
    <div
      className={cn(
        'inline-flex cursor-pointer flex-col items-center gap-y-2',
        className,
      )}
      onClick={handleClick}
    >
      <ProfileImage
        className="relative overflow-visible"
        as="div"
        size="xl"
        color={color}
        playerNumber={playerNumber}
        src={src}
      >
        {voteCount > 0 && (
          <Image
            className="absolute top-1/2 left-1/2 size-[calc(100%-1.125rem)] -translate-x-1/2 -translate-y-1/2 opacity-65"
            src="/images/icons/stamp.png"
            alt="stamp"
            width={32}
            height={32}
          />
        )}

        {range(Math.max(0, voteCount - 1)).map((_, index) => (
          <Image
            className="absolute size-5 -translate-x-1/2 -translate-y-1/2 opacity-65"
            key={index}
            src="/images/icons/stamp.png"
            alt="stamp"
            width={32}
            height={32}
            style={{
              left: randomStampPosition[index].x,
              top: randomStampPosition[index].y,
            }}
          />
        ))}
      </ProfileImage>

      {/* FIXME: font size is too small, need to discuss abuot this */}
      <p className="text-xs font-semibold">{username}</p>
    </div>
  );
};

export default VotePlayer;
