import jwt from 'jsonwebtoken';
import superjson from 'superjson';
import { create } from 'zustand';

import { JWTPayload, Player, PlayerMapRecord, TeamMapRecord } from '@types';

type PoeltlStore = {
  playerGuesses: Player[];
  setPlayerGuesses: (playerGuesses: Player[]) => void;
  playerMap: Map<number, PlayerMapRecord>;
  setPlayerMap: (playerMap: Map<number, PlayerMapRecord>) => void;
  teamMap: Map<number, TeamMapRecord>;
  setTeamMap: (teamMap: Map<number, TeamMapRecord>) => void;
  chosenPlayerId: number;
  setChosenPlayerId: (chosenPlayerId: number) => void;
  history: Map<string, number>;
  decodeToken: (token: string) => void;
};

export const usePoeltlStore = create<PoeltlStore>((set, get) => ({
  playerGuesses: [],
  setPlayerGuesses: (playerGuesses) => set({ playerGuesses }),
  playerMap: new Map<number, PlayerMapRecord>(),
  setPlayerMap: (playerMap) => set({ playerMap }),
  teamMap: new Map<number, TeamMapRecord>(),
  setTeamMap: (teamMap) => set({ teamMap }),
  chosenPlayerId: 0,
  setChosenPlayerId: (chosenPlayerId) => set({ chosenPlayerId }),
  history: new Map<string, number>(),
  decodeToken: (token) => {
    const { guesses, previousHistory: historySuperJson } = jwt.decode(token) as JWTPayload;
    const history = superjson.deserialize<Map<string, number>>(historySuperJson);

    const playerGuesses = guesses.map((id): Player => {
      const player = get().playerMap.get(id)!;

      return { id, ...player };
    });

    set({ history, playerGuesses });
  },
}));
