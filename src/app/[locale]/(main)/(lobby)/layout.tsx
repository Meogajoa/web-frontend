'use client';

import { BottomNavigationContent } from '@/components/BottomNavigation';
import React, { type PropsWithChildren } from 'react';

const LobbyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // Subscribe to the alert topic to receive notifications for like invites, etc.
  // TODO: Implement the alert system
  // useSubscription('/topic/alert', noop);

  return (
    <>
      {children}
      <BottomNavigationContent
        className="bottom-0-dynamic fixed z-10"
        renderPlaceholder
      />
    </>
  );
};

export default LobbyLayout;
