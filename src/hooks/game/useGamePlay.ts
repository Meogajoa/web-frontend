import useGamePlayersNoticeHandler from '@/hooks/game/useGamePlayersNoticeHandler';
import useGameSystemNoticeHandler from '@/hooks/game/useGameSystemNoticeHandler';
import usePlayerGameInfoHandler from '@/hooks/game/usePlayerGameInfoHandler';

const useGamePlay = ({
  enabled,
  onGameEnd: handleGameEnd,
}: {
  enabled: boolean;
  onGameEnd?: () => void;
}) => {
  usePlayerGameInfoHandler({ enabled });
  useGameSystemNoticeHandler({ enabled, onGameEnd: handleGameEnd });
  useGamePlayersNoticeHandler({ enabled });
};

export default useGamePlay;
