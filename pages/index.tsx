import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { setCookie } from 'nookies';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@components/ErrorFallback';
import { useMount } from '@hooks';
import { Home } from '@screens/Home';
import { Navigation } from '@screens/Nav';
import { getData } from '@server';
import { usePoeltlStore } from '@stores';
import { Data, PlayerMapRecord, StoreMaps, TeamMapRecord } from '@types';
import { getCurrentUTCOffset } from '@utils';

const OFF_SET_COOKIE = 'utcOffset';

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({ req }) => {
  const { cookies } = req;
  const offSet = parseInt(cookies[OFF_SET_COOKIE] ?? '0', 10) || 0;

  const data = await getData(offSet);

  return { props: { data } };
};

export function getMaps({ players, teams }: Omit<Data, 'chosenPlayerId'>): StoreMaps {
  const teamMap = new Map<number, TeamMapRecord>();
  teams.forEach(({ abbreviation, conference, division, id, name }) => teamMap.set(id, { abbreviation, conference, division, name }));

  const playerMap = new Map<number, PlayerMapRecord>();
  players.forEach(({ age, height, id, name, number, pos, teamId, teams }) => playerMap.set(id, { age, height, name, number, pos, teamId, teams }));

  return { playerMap, teamMap };
}

const Index = ({ data: { players, teams, chosenPlayerId } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { playerMap, teamMap } = getMaps({ players, teams });
  const { setPlayerMap, setTeamMap, setChosenPlayerId } = usePoeltlStore();

  useMount(() => {
    setPlayerMap(playerMap);
    setTeamMap(teamMap);
    setChosenPlayerId(chosenPlayerId);
    setCookie(null, 'utcOffset', getCurrentUTCOffset());
  });

  return (
    <>
      <Navigation />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Home />
      </ErrorBoundary>
    </>
  );
};

export default Index;
