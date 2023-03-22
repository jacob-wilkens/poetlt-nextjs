import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { useMount } from '@hooks';
import { Home } from '@screens/Home';
import { Navigation } from '@screens/Nav';
import { getData } from '@server';
import { usePoeltlStore } from '@stores';
import { Data, PlayerMapRecord, StoreMaps, TeamMapRecord } from '@types';

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async () => {
  const { players, teams, chosenPlayerId } = await getData();

  return {
    props: {
      data: { players, teams, chosenPlayerId },
    },
  };
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
  });

  return (
    <>
      <Navigation />
      <Home />
    </>
  );
};

export default Index;
