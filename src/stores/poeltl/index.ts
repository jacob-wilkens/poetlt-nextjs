import { create } from 'zustand';

import { Player, PlayerMapRecord, TeamMapRecord } from '@types';

type PoeltlStore = {
  playerGuesses: Player[];
  setPlayerGuesses: (playerGuesses: Player[]) => void;
  playerMap: Map<number, PlayerMapRecord>;
  setPlayerMap: (playerMap: Map<number, PlayerMapRecord>) => void;
  teamMap: Map<number, TeamMapRecord>;
  setTeamMap: (teamMap: Map<number, TeamMapRecord>) => void;
  chosenPlayerId: number;
  setChosenPlayerId: (chosenPlayerId: number) => void;
};

export const usePoeltlStore = create<PoeltlStore>((set) => ({
  playerGuesses: [],
  setPlayerGuesses: (playerGuesses) => set({ playerGuesses }),
  playerMap: new Map<number, PlayerMapRecord>(),
  setPlayerMap: (playerMap) => set({ playerMap }),
  teamMap: new Map<number, TeamMapRecord>(),
  setTeamMap: (teamMap) => set({ teamMap }),
  chosenPlayerId: 0,
  setChosenPlayerId: (chosenPlayerId) => set({ chosenPlayerId }),
}));
