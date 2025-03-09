import { A_SECOND } from '@/constants/misc';
import { baseChatMessageSchema } from '@/types/chat';
import { usernameSchema } from '@/types/user';
import { server } from '@/utils/axios';
import { sleep } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';

export type JoinRoomRequest = {
  id: string;
};

const joinRoomResponseSchema = z.object({
  chatLogs: z.array(baseChatMessageSchema),
  name: z.string(),
  owner: usernameSchema,
  playing: z.boolean(),
});
export type JoinRoomResponse = z.infer<typeof joinRoomResponseSchema>;

const useJoinRoom = ({
  variables: { id },
  onError,
}: {
  variables: JoinRoomRequest;
  onError?: (error: AxiosError<JoinRoomResponse, JoinRoomRequest>) => void;
}) => {
  const _joinRoomAsync = React.useCallback(
    async ({ id: _id }: JoinRoomRequest) => {
      const data = server
        .post<JoinRoomResponse>('/room/join', { id: _id })
        .then((response) => joinRoomResponseSchema.parse(response.data));
      await sleep(A_SECOND);
      return data;
    },
    [],
  );

  const mutation = useMutation<
    JoinRoomResponse,
    AxiosError<JoinRoomResponse, JoinRoomRequest>,
    JoinRoomRequest,
    void
  >({
    mutationFn: _joinRoomAsync,
    onError,
  });

  React.useEffect(() => {
    mutation.mutate({ id });
  }, [id]);

  return {
    ...mutation,
    joinRoom: mutation.mutate,
    joinRoomAsync: mutation.mutateAsync,
  };
};

export default useJoinRoom;
