import { STOMP_CLIENT_NAME } from '@/constants/stomp';
import useSessionId from '@/hooks/account/useSessionId';
import { assert } from '@/utils/assert';
import {
  useStompClient as _useStompClient,
  type Client,
  type IPublishParams,
} from 'react-stomp-hooks';

type CustomClient = Client & {
  publishWithDefaults: (params: IPublishParams) => void;
};

const useStompClient = (name: string = STOMP_CLIENT_NAME) => {
  const client = _useStompClient(name);
  const sessionId = useSessionId();

  assert(client, 'client is null');

  return {
    ...client,
    publishWithDefaults(params: IPublishParams) {
      return client?.publish({
        ...params,
        headers: {
          ...params.headers,
          Authorization: sessionId,
        },
      });
    },
  } as CustomClient;
};

export default useStompClient;
