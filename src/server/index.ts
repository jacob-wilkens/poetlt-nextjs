import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import path from 'path';
import superjson from 'superjson';

import { ChosenPlayerMap, Data, JWTPayload, UpdateJWTParams } from '@types';

const expiresIn = Math.floor(Date.now() / 1000) + 100 * 365 * 24 * 60 * 60;
const basePath = process.cwd();

export async function getData(): Promise<Data> {
  const playerPath = path.join(basePath, 'data', 'players.json');
  const playerData = await fs.readFile(playerPath, 'utf-8');

  const teamPath = path.join(basePath, 'data', 'teams.json');
  const teamData = await fs.readFile(teamPath, 'utf-8');

  const chosenPlayerPath = path.join(basePath, 'data', 'chosen-players.json');
  const chosenPlayers = await fs.readFile(chosenPlayerPath, 'utf-8');
  const chosenPlayerMap = superjson.parse<ChosenPlayerMap>(chosenPlayers);

  const players = JSON.parse(playerData);
  const teams = JSON.parse(teamData);
  const chosenPlayerId = chosenPlayerMap.get(getTodayDateString())!;

  return { chosenPlayerId, players, teams };
}

//function to get date string of current date in MM/DD/YYYY format
export function getTodayDateString(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(today);
}

export async function createTokenWithUpdatedHistory({ playerId, previousToken }: UpdateJWTParams): Promise<string> {
  let { guesses, previousHistory, wonToday } = await validateJwtToken(previousToken);

  const today = getTodayDateString();
  const history = superjson.deserialize<Map<string, number>>(previousHistory);
  const chosenPlayerMap = await getChosenPlayerMap();

  if (wonToday && history.has(today)) throw new Error('You have already won today, please wait until tomorrow to play again');
  if (guesses.length === 8) throw new Error('You have already guessed 8 times today');
  if (guesses.includes(playerId)) throw new Error('You have already guessed this player today');

  guesses.push(playerId);
  wonToday = chosenPlayerMap.get(today) === playerId;
  history.set(today, wonToday ? guesses.length : 0);

  const token = await createJwtToken({ guesses, previousHistory: superjson.serialize(history), wonToday: false }, { expiresIn });

  if (!token) throw new Error('Failed to create JWT token');

  return token;
}

export async function createNewToken(playerId: number): Promise<string> {
  const guesses = [playerId];

  const chosenPlayerMap = await getChosenPlayerMap();
  const today = getTodayDateString();

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
