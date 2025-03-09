'use client';

import { CreateRoomButton } from '@/components/Button';
import HomeHeader from '@/components/HomeHeader';
import RoomList from '@/containers/room/RoomList';
import { useQueryClient } from '@tanstack/react-query';

const HomePage = () => {
  const queryClient = useQueryClient();

  return (
    <>
      <HomeHeader
        className="fixed inset-0 z-10"
        renderPlaceholder
        onRefresh={handleRefresh}
      />
      <RoomList />
      <CreateRoomButton className="fixed right-4 bottom-24 z-20" />
    </>
  );

  function handleRefresh() {
    queryClient.resetQueries({ queryKey: ['rooms'] });
  }
};

export default HomePage;
