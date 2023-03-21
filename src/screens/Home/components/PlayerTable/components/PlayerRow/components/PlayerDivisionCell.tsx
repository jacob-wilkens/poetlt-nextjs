import { usePoeltlStore } from '@stores';

type Props = {
  division: string;
};

export const PlayerDivisionCell = ({ division }: Props) => {
  const { chosenPlayerId, playerMap, teamMap } = usePoeltlStore();
  const { teamId } = playerMap.get(chosenPlayerId)!;
  const { division: chosenDivision } = teamMap.get(teamId)!;

  const className = division === chosenDivision ? 'bg-success' : '';

  return <td className={className}>{division}</td>;
};
