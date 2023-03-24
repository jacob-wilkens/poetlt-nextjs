import { SuperJSONResult } from 'superjson/dist/types';
import z from 'zod';

import { UseMutateFunction } from '@tanstack/react-query';

export type Player = {
  id: number;
  name: string;
  teamId: number;
  teams: number[];
  pos: string;
  height: string;
  age: number;
  number: number;
};

export type Team = {
  id: number;
  name: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: string;
};

export type Data = {
  teams: Team[];
  players: Player[];
  chosenPlayerId: number;
};

export type TeamMapRecord = Omit<Team, 'id'>;

export type PlayerMapRecord = Omit<Player, 'id'>;

export type StoreMaps = {
  playerMap: Map<number, PlayerMapRecord>;
  teamMap: Map<number, TeamMapRecord>;
};

export type ChosenPlayerMap = Map<string, number>; // date -> player id

export type JWTPayload = {
  guesses: Player[];
  previousHistory: SuperJSONResult;
  wonToday: boolean;
};

export type UpdateJWTParams = {
  playerId: number;
  previousToken: string;
};

export const tokenSchema = z.object({
  playerId: z.number().int(),
  token: z.string().optional(),
});

export const tokenResetSchema = z.object({
  token: z.string(),
});

export type TokenResetSchema = z.infer<typeof tokenResetSchema>;

export type TokenSchema = z.infer<typeof tokenSchema>;

export type TokenResponse = {
  token: string;
};

export type TokenErrorResponse = {
  error: boolean;
  message: string;
};

export type Streaks = {
  currentStreak: number;
  longestStreak: number;
  winPct: number;
  winDistribution: Map<number, number>;
};

export type TokenResetFn = UseMutateFunction<TokenResponse, Error, { token: string }, unknown>;

export type TokenMutationFnParams<T> = {
  url: string;
  payload: T;
};

export type TokenMutationParams = {
  url: string;
};
