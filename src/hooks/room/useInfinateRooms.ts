import { A_MINUTE, A_SECOND } from '@/constants/misc';
import { server } from '@/utils/axios';
import { sleep } from '@/utils/misc';
import {
  type InfiniteData,
  type QueryFunctionContext,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';

const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  maxUser: z.number(),
  currentUser: z.number(),
  playing: z.boolean(),
});
export type Room = z.infer<typeof roomSchema>;

const paginatedRoomsResponseSchema = z.object({
  rooms: z.array(roomSchema),
  last: z.boolean(),
});
export type PaginatedRoomsResponse = z.infer<
  typeof paginatedRoomsResponseSchema
>;

const useInfiniteRooms = () => {
  const _queryRoomsAsync = React.useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      const data = server
        .get<PaginatedRoomsResponse>(`/room/pages/${pageParam}`)
        .then((response) => paginatedRoomsResponseSchema.parse(response.data));

      await sleep(A_SECOND);
      return data;
    },
    [],
  );

  const { data, ...rest } = useInfiniteQuery<
    PaginatedRoomsResponse,
    AxiosError<PaginatedRoomsResponse, void>,
    InfiniteData<PaginatedRoomsResponse, number[]>,
    string[],
    number
  >({
    queryKey: ['rooms'],
    queryFn: _queryRoomsAsync,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.last ? lastPageParam + 1 : null,
    staleTime: 2 * A_MINUTE,
    gcTime: A_MINUTE,
    refetchInterval: 4 * A_MINUTE,
  });

  const rooms = data?.pages.flatMap((page) => page?.rooms);
  return { ...rest, rooms };
};

export default useInfiniteRooms;
