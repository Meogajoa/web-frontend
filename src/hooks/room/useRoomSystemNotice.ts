import useSubscription from '@/hooks/stomp/useSubscription';
import { z } from 'zod';

enum RoomSystemNoticeType {
  GameStart = 'GAME_START',
}
const roomSystemNoticeTypeSchema = z.nativeEnum(RoomSystemNoticeType);

const roomSystemNoticeSchema = z.object({
  type: roomSystemNoticeTypeSchema,
  content: z.string(),
});

const useRoomSystemNotice = ({
  variables: { id },
  onGameStart,
}: {
  variables: { id: string };
  onGameStart?: () => void;
}) => {
  useSubscription(`/topic/room/${id}/notice/system`, ({ body }) => {
    const jsonBody = JSON.parse(body);
    const notice = roomSystemNoticeSchema.parse(jsonBody);

    console.debug(`/topic/room/${id}/notice/system: `, notice);

    switch (notice.type) {
      case RoomSystemNoticeType.GameStart:
        onGameStart?.();
        break;
    }
  });
};

export default useRoomSystemNotice;
