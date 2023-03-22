import { SuperJSONResult } from 'superjson/dist/types';
import z from 'zod';

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
  guesses: number[];
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
