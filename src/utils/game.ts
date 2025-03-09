import { PlayerNumber } from '@/types/game';
import type { Maybe } from '@/types/misc';

export const convertToPlayerNumber = (
  input: Maybe<PlayerNumber | string | number>,
) => {
  const number = Number(input);
  if (!isValidPlayerNumber(number)) {
    return PlayerNumber.Invalid;
  }

  return number as PlayerNumber;
};

export const isValidPlayerNumber = (number: number) => {
  return (
    !Number.isNaN(number) &&
    Number.isInteger(number) &&
    number >= PlayerNumber.One &&
    number <= PlayerNumber.Nine
  );
};
