import { useMemo } from 'react';

import { usePoeltlStore } from '@stores';

export const usePlayerNameMap = (): Map<string, number> => {
  const { playerMap } = usePoeltlStore();

  return useMemo(() => {
    const map = new Map<string, number>();

    playerMap.forEach(({ name }, id) => {
      map.set(name, id);
    });

    return map;
  }, [playerMap]);
};
