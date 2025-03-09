import { server } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import z from 'node_modules/zod/lib';
import React from 'react';

export type CreateRoomForm = {
  name: string;
  password: string;
};

const createRoomResponseSchema = z.object({
  id: z.string(),
});
export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>;

const useCreateRoom = ({
  onSuccess,
}: {
  onSuccess: (data: CreateRoomResponse, variables: CreateRoomForm) => void;
}) => {
  const _createRoomAsync = React.useCallback(async (data: CreateRoomForm) => {
    return await server
      .post<CreateRoomResponse>('/room/create', data)
      .then((response) => createRoomResponseSchema.parse(response.data));
  }, []);

  const mutation = useMutation<
    CreateRoomResponse,
    AxiosError<CreateRoomResponse, CreateRoomForm>,
    CreateRoomForm,
    void
  >({
    mutationFn: _createRoomAsync,
    onSuccess,
  });

  return {
    ...mutation,
    createRoom: mutation.mutate,
    createRoomAsync: mutation.mutateAsync,
  };
};

export default useCreateRoom;
