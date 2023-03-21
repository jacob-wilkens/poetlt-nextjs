import { usePoeltlStore } from '@stores';

type Props = {
  conference: string;
};

export const PlayerConferenceCell = ({ conference }: Props) => {
  const { chosenPlayerId, playerMap, teamMap } = usePoeltlStore();
  const { teamId } = playerMap.get(chosenPlayerId)!;
  const { conference: chosenConference } = teamMap.get(teamId)!;

  const className = conference === chosenConference ? 'bg-success' : '';

  return <td className={className}>{conference}</td>;
};
