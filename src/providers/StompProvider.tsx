import { STOMP_CLIENT_NAME } from '@/constants/stomp';
import useSessionId from '@/hooks/account/useSessionId';
import { CONFIGS } from '@/utils/config';
import React, { type PropsWithChildren } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';

type Props = {
  onConnect?: () => void;
  onError?: (error: Error) => void;
};

const StompProvider = React.memo<PropsWithChildren<Props>>(
  ({ onConnect, onError, children }) => {
    const sessionId = useSessionId();

    return (
      <StompSessionProvider
        url={CONFIGS.WS_URL}
        connectHeaders={{
          Authorization: sessionId,
        }}
        onConnect={onConnect}
        onWebSocketError={onError}
        name={STOMP_CLIENT_NAME}
      >
        {children}
      </StompSessionProvider>
    );
  },
);
StompProvider.displayName = 'StompProvider';

export default StompProvider;
