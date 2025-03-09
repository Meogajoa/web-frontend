import React from 'react';
import { useInterval } from 'react-use';

const useDotsString = ({ maxLength = 3 }: { maxLength?: number }) => {
  const [dotsCount, setDotsCount] = React.useState(0);
  useInterval(() => {
    setDotsCount((prev) => prev + 1);
  }, 500);

  return '.'.repeat(dotsCount % (maxLength + 1));
};

export default useDotsString;
