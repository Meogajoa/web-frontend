import { STOMP_CLIENT_NAME } from '@/constants/stomp';
import useSessionId from '@/hooks/account/useSessionId';
import {
  useSubscription as _useSubscription,
  type messageCallbackType,
  type StompHeaders,
} from 'react-stomp-hooks';

const useSubscription = (
  destinations: string | string[],
  onMessage: messageCallbackType,
  headers?: StompHeaders,
  name: string = STOMP_CLIENT_NAME,
) => {
  const sessionId = useSessionId();
  _useSubscription(
    destinations,
    onMessage,
    headers || {
      Authorization: sessionId,
    },
    name,
  );
};

export default useSubscription;
