import jwt from 'jsonwebtoken';
import superjson from 'superjson';
import { create } from 'zustand';

import { JWTPayload, Player, PlayerMapRecord, TeamMapRecord, TokenResetFn } from '@types';
import { getTodayDateString } from '@utils';

type PoeltlStore = {
  playerGuesses: Player[];
  setPlayerGuesses: (playerGuesses: Player[]) => void;
  playerMap: Map<number, PlayerMapRecord>;
  teamMap: Map<number, TeamMapRecord>;
  chosenPlayerId: number;
  history: Map<string, number>;
  decodeToken: (token: string, resetFn?: TokenResetFn) => void;
};

export const usePoeltlStore = create<PoeltlStore>((set) => ({
  playerGuesses: [],
  setPlayerGuesses: (playerGuesses) => set({ playerGuesses }),
  playerMap: new Map<number, PlayerMapRecord>(),
  teamMap: new Map<number, TeamMapRecord>(),
  chosenPlayerId: 0,
  history: new Map<string, number>(),
  decodeToken: (token, resetFn) => {
    const { guesses: playerGuesses, previousHistory: historySuperJson } = jwt.decode(token) as JWTPayload;
    const history = superjson.deserialize<Map<string, number>>(historySuperJson);

    const todayDateString = getTodayDateString();

    if (!history.has(todayDateString) && resetFn) resetFn({ token });

    set({ history, playerGuesses });
  },
}));
