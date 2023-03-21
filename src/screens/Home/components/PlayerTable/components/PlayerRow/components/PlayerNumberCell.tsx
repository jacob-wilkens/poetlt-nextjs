import { usePoeltlStore } from '@stores';

type Props = {
  number: number;
};

export const PlayerNumberCell = ({ number }: Props) => {
  const { chosenPlayerId, playerMap } = usePoeltlStore();
  const { number: chosenNumber } = playerMap.get(chosenPlayerId)!;

  let className = '';

  if (number === chosenNumber) className = 'bg-success';
  else if (number >= chosenNumber - 2 && number <= chosenNumber + 2) className = 'bg-warning';

  let arrow = '';

  if (number < chosenNumber) arrow = 'fa fa-arrow-up';
  else if (number > chosenNumber) arrow = 'fa fa-arrow-down';

  return (
    <td className={className}>
      <span>
        {number}
        <br />
      </span>
      {arrow ? <i className={arrow} /> : null}
    </td>
  );
};
