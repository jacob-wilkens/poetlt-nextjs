import { cookies } from 'next/headers';

import { Home } from '@screens/Home';
import { getData } from '@server';
import { Data, PlayerMapRecord, TeamMapRecord } from '@types';

import { PoeltlInitializer } from './PoeltlInitializer';

const OFF_SET_COOKIE = 'utcOffset';

async function getPageData(): Promise<Data> {
  const cookieStore = cookies();
  const offSetCookie = cookieStore.get(OFF_SET_COOKIE);
  const offSet = offSetCookie ? parseInt(offSetCookie.value ?? 0) : 0;

  return getData(offSet);
}

export default async function HomePage() {
  const { players, teams, chosenPlayerId } = await getPageData();

  const teamMap = new Map<number, TeamMapRecord>();
  teams.forEach(({ abbreviation, conference, division, id, name }) => teamMap.set(id, { abbreviation, conference, division, name }));

  const playerMap = new Map<number, PlayerMapRecord>();
  players.forEach(({ age, height, id, name, number, pos, teamId, teams }) => playerMap.set(id, { age, height, name, number, pos, teamId, teams }));

  return (
    <>
      {/*@ts-ignore*/}
      <PoeltlInitializer {...{ chosenPlayerId, playerParseMap: playerMap, teamParseMap: teamMap }} />
      <Home />
    </>
  );
}
