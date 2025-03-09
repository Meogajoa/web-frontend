'use client';

import { DropdownExample } from '@/components/Dropdown';
import { cn } from '@/utils/classname';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
  renderPlaceholder?: boolean;
  onRefresh?: () => void;
};

const HomeHeader: React.FC<Props> = ({
  className,
  renderPlaceholder,
  onRefresh,
}) => {
  const t = useTranslations('homeRoute');
  const [isRotating, setIsRotating] = React.useState(false);

  return (
    <>
      {renderPlaceholder && <div className="h-39" aria-hidden />}

      <header className={cn('h-fit bg-white', className)}>
        <div className="flex h-22 items-center justify-between px-4">
          <h1 className="text-3xl font-semibold">{t('header.title')}</h1>
          <button
            className={cn(
              'size-6 stroke-black',
              isRotating &&
                'rotate-[360deg] transition-transform duration-1000',
            )}
            onClick={handleRefreshClick(true)}
            onTransitionEnd={handleRefreshClick(false)}
          >
            <ArrowPathIcon />
          </button>
        </div>

        <div className="shadow-bottom flex gap-x-4 p-4">
          <DropdownExample>{t('header.categoryButton')}</DropdownExample>
          <DropdownExample>{t('header.roomVisibilityButton')}</DropdownExample>
        </div>
      </header>
    </>
  );

  function handleRefreshClick(isRefreshing: boolean) {
    return () => {
      if (isRefreshing) {
        onRefresh?.();
      }

      setIsRotating(isRefreshing);
    };
  }
};

export default HomeHeader;
