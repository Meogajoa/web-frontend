'use client';

import { RoomItem } from '@/components/RoomItem';
import useInfiniteRooms from '@/hooks/room/useInfinateRooms';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
};

const RoomList: React.FC<Props> = ({ className }) => {
  const t = useTranslations('homeRoute');
  const {
    rooms,
    isSuccess,
    isFetchingNextPage: isLoadingMore,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteRooms();

  const isInitialLoading = isFetching && !isLoadingMore;

  return (
    <div className={cn('px-4 py-2.5', className)}>
      <nav className="space-y-2.5">
        {isSuccess &&
          rooms?.map(({ id, name, maxUser, currentUser }) => (
            <RoomItem
              className="w-full"
              key={id}
              id={id}
              title={name}
              description={t('exampleRoom.description')}
              total={maxUser}
              current={currentUser}
              isPrivate={false}
            />
          ))}
      </nav>

      {isInitialLoading && <h2 className="text-center">loading rooms...</h2>}
      {isLoadingMore && <h2 className="text-center">loading more rooms...</h2>}

      <button className="bg-gray-4 rounded-xl p-4" onClick={handleFetchMore}>
        Test: try fetching more
      </button>
    </div>
  );

  function handleFetchMore() {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }
};

export default RoomList;
