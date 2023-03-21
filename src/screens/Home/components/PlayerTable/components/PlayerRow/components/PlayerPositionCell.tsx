import { usePoeltlStore } from '@stores';

type Props = {
  position: string;
};

export const PlayerPositionCell = ({ position }: Props) => {
  const { chosenPlayerId, playerMap } = usePoeltlStore();
  const { pos: chosenPosition } = playerMap.get(chosenPlayerId)!;

  let className = '';

  if (position === chosenPosition) className = 'bg-success';
  else if (position.includes(chosenPosition)) className = 'bg-warning';

  return <td className={className}>{position}</td>;
};
