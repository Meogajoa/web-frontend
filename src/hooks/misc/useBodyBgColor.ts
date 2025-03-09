import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';

const useBodyBgColor = (newBgColor: string) => {
  const { bgColor, setBgColor } = useTheme();
  const bgColorRef = React.useRef(bgColor);

  React.useEffect(() => {
    setBgColor(newBgColor);

    return () => {
      setBgColor(bgColorRef.current);
    };
  }, [newBgColor]);
};

export default useBodyBgColor;
