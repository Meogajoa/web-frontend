import useSubscription from '@/hooks/stomp/useSubscription';
import { usernameSchema } from '@/types/user';
import React from 'react';
import { z } from 'zod';

const useRoomUsersNotice = ({
  variables: { id },
}: {
  variables: { id: string };
}) => {
  const [users, setUsers] = React.useState<string[]>([]);

  useSubscription(`/topic/room/${id}/notice/users`, ({ body }) => {
    const jsonBody = JSON.parse(body);
    const users = z.array(usernameSchema).parse(jsonBody);
    setUsers(users);

    console.debug(`/topic/room/${id}/notice/users: `, users);
  });

  return { users };
};

export default useRoomUsersNotice;
