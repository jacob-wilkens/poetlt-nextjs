import { cookies } from 'next/headers';

import { Home } from '@screens/Home';
import { getData, handleTokenReset } from '@server';
import { Data, OFF_SET_COOKIE, Player, PlayerMapRecord, TeamMapRecord } from '@types';

import { PoeltlInitializer } from './PoeltlInitializer';

async function getPageData(): Promise<Data> {
  const cookieStore = cookies();
  const offSetCookie = cookieStore.has(OFF_SET_COOKIE);
  const offSet = offSetCookie ? parseInt(cookieStore.get(OFF_SET_COOKIE)?.value! ?? 0) : 0;

  const data = await getData(offSet);
  const hasToken = cookieStore.has('token');

  let playerGuesses: Player[] = [];
  let previousHistory: Map<string, number> = new Map();

  let errorValidatingToken = false;

  if (hasToken) {
    try {
      const { guesses, history } = await handleTokenReset({ cookieStore, offSet });

      playerGuesses = guesses;
      previousHistory = history;
    } catch (error) {
      console.error(error);
      errorValidatingToken = true;
    }
  }

  return { ...data, playerGuesses, previousHistory, errorValidatingToken };
}

export default async function HomePage() {
  const { players, teams, chosenPlayerId, playerGuesses, previousHistory, errorValidatingToken } = await getPageData();

  const teamMap = new Map<number, TeamMapRecord>();
  teams.forEach(({ abbreviation, conference, division, id, name }) => teamMap.set(id, { abbreviation, conference, division, name }));

  const playerMap = new Map<number, PlayerMapRecord>();
  players.forEach(({ age, height, id, name, number, pos, teamId, teams }) => playerMap.set(id, { age, height, name, number, pos, teamId, teams }));

  return (
    <>
      {/*@ts-ignore*/}
      <PoeltlInitializer {...{ chosenPlayerId, playerParseMap: playerMap, teamParseMap: teamMap, playerGuesses, previousHistoryParseMap: previousHistory, errorValidatingToken }} />
      <Home />
    </>
  );
}
