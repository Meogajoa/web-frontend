import { A_SECOND } from '@/constants/misc';
import useSessionId from '@/hooks/account/useSessionId';
import { server } from '@/utils/axios';
import { sleep } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';

const authenticateResponseSchema = z.object({
  nickname: z.string(),
});
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;

const useAuthenticate = ({
  sleepSeconds = 1,
  onSuccess,
  onError,
}: {
  sleepSeconds?: number;
  onSuccess?: (data: AuthenticateResponse) => void;
  onError?: (error: AxiosError<AuthenticateResponse, void>) => void;
}) => {
  const sessionId = useSessionId();

  const _authenticateAsync = React.useCallback(async () => {
    const data = server
      .post<AuthenticateResponse>('/auth/test')
      .then((response) => authenticateResponseSchema.parse(response.data));
    await sleep(sleepSeconds * A_SECOND);
    return data;
  }, []);

  const mutation = useMutation<
    AuthenticateResponse,
    AxiosError<AuthenticateResponse, void>,
    void,
    void
  >({
    mutationFn: _authenticateAsync,
    onSuccess,
    onError,
  });

  React.useEffect(() => {
    mutation.mutate();
  }, [sessionId]);

  return {
    ...mutation,
    authenticate: mutation.mutate,
    authenticateAsync: mutation.mutateAsync,
  };
};

export default useAuthenticate;
