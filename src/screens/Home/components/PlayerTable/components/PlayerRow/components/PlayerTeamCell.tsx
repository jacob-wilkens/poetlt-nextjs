import Image from 'next/image';

import { usePoeltlStore } from '@stores';

type Props = {
  teamName: string;
  teamId: number;
  abbreviation: string;
};

const getLogoUrl = (teamId: string) => `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;

export const PlayerTeamCell = ({ teamName, teamId, abbreviation }: Props) => {
  const { teamMap, playerMap, chosenPlayerId } = usePoeltlStore();
  const { teamId: chosenTeamId, teams: chosenTeams } = playerMap.get(chosenPlayerId)!;

  const { name: chosenTeamName } = teamMap.get(chosenTeamId)!;

  let className = '';

  if (teamName === chosenTeamName) className = 'bg-success';
  else if (chosenTeams.includes(teamId)) className = 'bg-warning';

  return (
    <td className={className}>
      <Image src={getLogoUrl(`${teamId}`)} alt={`${teamName} Logo`} width='40rem' height='40rem' />
      <br />
      {abbreviation}
    </td>
  );
};
