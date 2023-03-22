import { useMemo } from 'react';

import { Option } from 'react-bootstrap-typeahead/types/types';

import { usePoeltlStore } from '@stores';

export const usePlayerOptions = (): Option[] => {
  const { playerMap, playerGuesses } = usePoeltlStore();

  return useMemo(() => {
    const names = Array.from(playerMap.values()).map(({ name }) => name);
    const previousGuessedNames = playerGuesses.map(({ name }) => name);

    return names.filter((name) => !previousGuessedNames.includes(name));
  }, [playerMap, playerGuesses]);
};
