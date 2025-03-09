import React from 'react';

const useSessionId = () => {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'sessionId') {
          onStoreChange();
        }
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    () => localStorage.getItem('sessionId') || '',
    () => '',
  );
};

export default useSessionId;
