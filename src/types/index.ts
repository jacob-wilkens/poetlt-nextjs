import { SuperJSONResult } from 'superjson/dist/types';

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
