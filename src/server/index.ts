import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import path from 'path';
import superjson from 'superjson';

import { ChosenPlayerMap, CreateJWTParams, Data, JWTPayload, Player, ResetTokenParams, Team, UpdateJWTParams } from '@types';
import { getTodayDateString } from '@utils';

const expiresIn = Math.floor(Date.now() / 1000) + 100 * 365 * 24 * 60 * 60;
const basePath = process.cwd();

export async function getData(offSet: number): Promise<Data> {
  const players = await getPlayerData();
  const teams: Team[] = await getTeamData();

  const chosenPlayerMap = await getChosenPlayerMap();
  const chosenPlayerId = chosenPlayerMap.get(getTodayDateString(offSet))!;

  return { chosenPlayerId, players, teams };
}

export async function createTokenWithUpdatedHistory({ playerId, previousToken, offSet }: UpdateJWTParams): Promise<string> {
  let { guesses, previousHistory, wonToday } = await validateJwtToken(previousToken);

  const today = getTodayDateString(offSet);
  const history = superjson.deserialize<Map<string, number>>(previousHistory);
  const chosenPlayerMap = await getChosenPlayerMap();

  const guessedPlayerIds = guesses.map(({ id }) => id);

  if (wonToday && history.has(today)) throw new Error('You have already won today, please wait until tomorrow to play again');
  if (guesses.length === 8) throw new Error('You have already guessed 8 times today');
  if (guessedPlayerIds.includes(playerId)) throw new Error('You have already guessed this player today');

  const playerMap = await getPlayerMap();
  const player = playerMap.get(playerId)!;

  guesses.push(player);
  wonToday = chosenPlayerMap.get(today) === playerId;
  history.set(today, wonToday ? guesses.length : 0);

  const token = await createJwtToken({ guesses, previousHistory: superjson.serialize(history), wonToday: false }, { expiresIn });

  if (!token) throw new Error('Failed to create JWT token');

  return token;
}

export async function createNewToken({ offSet, playerId }: CreateJWTParams): Promise<string> {
  const guesses: Player[] = [];
  const playerMap = await getPlayerMap();
  const player = playerMap.get(playerId)!;

  guesses.push(player);

  const chosenPlayerMap = await getChosenPlayerMap();
  const today = getTodayDateString(offSet);

  const wonToday = chosenPlayerMap.get(today) === playerId;

  const history = new Map<string, number>();

  if (wonToday) history.set(today, 1);
  else history.set(today, 0);

  const previousHistory = superjson.serialize(history);

  const token = await createJwtToken({ guesses, previousHistory, wonToday }, { expiresIn });

  if (!token) throw new Error('Failed to create JWT token');

  return token;
}

function validateJwtToken(payload: string): Promise<JWTPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, process.env.JWT_KEY!, (error, decoded) => {
      if (error) reject(new Error('Failed to validate JWT token'));
      else resolve(decoded as JWTPayload);
    });
  });
}

function createJwtToken(payload: JWTPayload, options: jwt.SignOptions): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_KEY!, options, (error, token) => {
      if (error) reject(new Error('Failed to create JWT token'));
      else resolve(token);
    });
  });
}

async function getChosenPlayerMap(): Promise<ChosenPlayerMap> {
  const chosenPlayerPath = path.join(basePath, 'data', 'chosen-players.json');
  const chosenPlayerData = await fs.readFile(chosenPlayerPath, 'utf-8');

  return superjson.parse<ChosenPlayerMap>(chosenPlayerData);
}

function shuffleArray(arr: number[]): number[] {
  return arr.sort(() => Math.random() - 0.5);
}

function createYearlyDateMap(): Map<string, number> {
  const today = new Date();
  const year = today.getFullYear();
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  const dateMap = new Map<string, number>();
  const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const dateString = new Intl.DateTimeFormat('en-US', { year: 'numeric', ...options }).format(currentDate);
    dateMap.set(dateString, 0);
  }

  return dateMap;
}

async function createChosenPlayerMap(): Promise<ChosenPlayerMap> {
  const chosenPlayerMap = new Map<string, number>();
  const yearlyDateMap = createYearlyDateMap();

  const playerData = await getPlayerData();
  const players = playerData.map(({ id }) => id);

  const shuffledPlayers = shuffleArray(players);

  [...yearlyDateMap.keys()].forEach((dateString, index) => {
    chosenPlayerMap.set(dateString, shuffledPlayers[index]);
  });

  return chosenPlayerMap;
}

async function getTeamData(): Promise<Team[]> {
  const teamPath = path.join(basePath, 'data', 'teams.json');
  const teamData = await fs.readFile(teamPath, 'utf-8');

  return JSON.parse(teamData) as Team[];
}

async function getPlayerData(): Promise<Player[]> {
  const playerPath = path.join(basePath, 'data', 'players.json');
  const playerData = await fs.readFile(playerPath, 'utf-8');

  return JSON.parse(playerData) as Player[];
}

async function getPlayerMap(): Promise<Map<number, Player>> {
  const playerMap = new Map<number, Player>();
  const playerData = await getPlayerData();

  playerData.forEach((player) => {
    playerMap.set(player.id, player);
  });

  return playerMap;
}

export async function resetToken({ token, offSet }: ResetTokenParams): Promise<string> {
  const { previousHistory: oldHistory } = await validateJwtToken(token);

  const history = superjson.deserialize<Map<string, number>>(oldHistory);
  const today = getTodayDateString(offSet);

  history.set(today, -1);

  const previousHistory = superjson.serialize(history);

  const newToken = await createJwtToken({ guesses: [], previousHistory, wonToday: false }, { expiresIn });

  if (!newToken) throw new Error('Failed to create JWT token');

  return newToken;
}
