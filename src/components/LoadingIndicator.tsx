import useDotsString from '@/hooks/misc/useDotsString';
import { cn } from '@/utils/classname';
import { getCssVariableValue } from '@/utils/misc';
import React from 'react';
import { HashLoader } from 'react-spinners';

type Props<T> = T & {
  className?: string;
  label?: React.ReactNode;
  color?: string | `--color-${string}`;
  loaderComponent?: React.ReactNode | React.FC<T>;
};

const LoadingIndicator = <T extends object = {}>({
  className,
  label,
  color: _color,
  loaderComponent: LoaderComponent,
  ...props
}: Props<T>) => {
  const dots = useDotsString({ maxLength: 3 });
  const color = getCssVariableValue(_color || '--color-red');

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-y-4 font-semibold',
        className,
      )}
    >
      {!LoaderComponent ? (
        <HashLoader color={color} {...props} />
      ) : typeof LoaderComponent === 'function' ? (
        <LoaderComponent color={color} {...(props as T)} />
      ) : (
        LoaderComponent
      )}

      {label && (
        <div className="text-red relative">
          <span>{label}</span>
          <span className="absolute">{dots}</span>
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;
