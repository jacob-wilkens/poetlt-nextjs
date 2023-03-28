import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import superjson from 'superjson';
import { create } from 'zustand';

import { JWTPayload, Player, PlayerMapRecord, TeamMapRecord } from '@types';

type PoeltlStore = {
  playerGuesses: Player[];
  playerMap: Map<number, PlayerMapRecord>;
  teamMap: Map<number, TeamMapRecord>;
  chosenPlayerId: number;
  history: Map<string, number>;
  decodeToken: () => void;
};

export const usePoeltlStore = create<PoeltlStore>((set) => ({
  playerGuesses: [],
  playerMap: new Map<number, PlayerMapRecord>(),
  teamMap: new Map<number, TeamMapRecord>(),
  chosenPlayerId: 0,
  history: new Map<string, number>(),
  decodeToken: () => {
    const hasToken = hasCookie('token');
    if (!hasToken) return;

    const token = getCookie('token')?.toString() ?? '';

    try {
      const { guesses: playerGuesses, previousHistory: historySuperJson } = jwt.decode(token) as JWTPayload;
      const history = superjson.deserialize<Map<string, number>>(historySuperJson);

      set({ history, playerGuesses });
    } catch (err) {
      deleteCookie('token');
    }
  },
}));
