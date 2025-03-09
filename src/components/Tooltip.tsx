import React, { useId } from 'react';
import { type PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';

type Props = {
  className?: string;
  arrowClassName?: string;
  contents: React.ReactNode | React.FC;
  clickable?: boolean;
  clickToOpen?: boolean;
  delayHide?: number;
  delayShow?: number;
  noArrow?: boolean;
  offset?: number;
  opacity?: number;
  openOnClick?: boolean;
  place?: PlacesType;
};

const Tooltip: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  arrowClassName,
  contents: Contents,
  clickToOpen,
  place = 'right',
  children,
  ...props
}) => {
  const id = useId();

  return (
    <>
      <div data-tooltip-id={id}>{children}</div>

      <ReactTooltip
        className={className}
        classNameArrow={arrowClassName}
        id={id}
        place={place}
        opacity={100}
        disableStyleInjection
        openEvents={clickToOpen ? { click: true } : undefined}
        {...props}
      >
        {typeof Contents === 'function' ? <Contents /> : Contents}
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
