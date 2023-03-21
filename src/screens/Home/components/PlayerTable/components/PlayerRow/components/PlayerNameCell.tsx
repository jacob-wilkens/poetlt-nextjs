import { usePoeltlStore } from '@stores';

type Props = {
  playerName: string;
};

export const PlayerNameCell = ({ playerName }: Props) => {
  const { chosenPlayerId, playerMap } = usePoeltlStore();
  const { name: chosenPlayerName } = playerMap.get(chosenPlayerId)!;

  const className = playerName === chosenPlayerName ? 'bg-success' : '';

  return <td className={className}>{playerName}</td>;
};
