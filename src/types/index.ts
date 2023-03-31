import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

import { SuperJSONResult } from 'superjson/dist/types';
import z from 'zod';

export const OFF_SET_COOKIE = 'utcOffset';

export type ResetParams = {
  cookieStore: RequestCookies | ReadonlyRequestCookies;
  offSet: number;
};

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

export type ServerData = {
  teams: Team[];
  players: Player[];
  chosenPlayerId: number;
};

export type Data = {
  teams: Team[];
  players: Player[];
  chosenPlayerId: number;
  playerGuesses: Player[];
  previousHistory: Map<string, number>;
  errorValidatingToken: boolean;
};

export type TeamMapRecord = Omit<Team, 'id'>;

export type PlayerMapRecord = Omit<Player, 'id'>;

export type ChosenPlayerMap = Map<string, number>; // date -> player id

export type JWTPayload = {
  guesses: Player[];
  previousHistory: SuperJSONResult;
  wonToday: boolean;
};

export type Guess = {
  playerId: number;
  offSet: number;
  history: Map<string, number>;
  previousGuesses: Player[];
};

export type UpdateJWTParams = {
  playerId: number;
  previousToken: string;
  offSet: number;
};

export type CreateJWTParams = {
  playerId: number;
  offSet: number;
};

export type ResetTokenParams = {
  token: string;
  offSet: number;
};

export const tokenSchema = z.object({
  playerId: z.number().int(),
});

export const offSetSchema = z.string().refine((val) => !isNaN(Number(val)), { message: 'Value must be a number as a string' });

export type TokenSchema = z.infer<typeof tokenSchema>;

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

export type TokenMutationFnParams<T> = {
  url: string;
  payload: T;
};

export type TokenMutationParams = {
  url: string;
};

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: Theme[];
};

export type Theme = {
  name: string;
  icon: string;
};

export type ThemeType = 'light' | 'dark';
