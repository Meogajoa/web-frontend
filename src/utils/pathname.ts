import type { Optional } from '@/types/misc';

export const extractLocale = (pathname: string): Optional<string> => {
  const regex = /^\/([^/]+)/;
  const match = pathname.match(regex);
  return match?.[1];
};
