import Image from 'next/image';

import { usePoeltlStore } from '@stores';

type Props = {
  teamName: string;
  teamId: number;
  abbreviation: string;
  teams: number[];
};

const getLogoUrl = (teamId: string) => `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;

export const PlayerTeamCell = ({ teamName, teamId, abbreviation, teams }: Props) => {
  const { playerMap, chosenPlayerId } = usePoeltlStore();
  const { teamId: chosenTeamId } = playerMap.get(chosenPlayerId)!;

  let className = '';

  if (teamId === chosenTeamId) className = 'bg-success';
  else if (teams.includes(chosenTeamId)) className = 'bg-warning';

  return (
    <td className={className}>
      <Image src={getLogoUrl(`${teamId}`)} alt={`${teamName} Logo`} width={'40'} height={'40'} />
      <br />
      {abbreviation}
    </td>
  );
};
