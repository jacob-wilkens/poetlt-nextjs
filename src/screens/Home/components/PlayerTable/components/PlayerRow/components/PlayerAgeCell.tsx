import { usePoeltlStore } from '@stores';

type Props = {
  age: number;
};

export const PlayerAgeCell = ({ age }: Props) => {
  const { chosenPlayerId, playerMap } = usePoeltlStore();
  const { age: chosenAge } = playerMap.get(chosenPlayerId)!;

  let className = '';

  if (age === chosenAge) className = 'bg-success';
  else if (age >= chosenAge - 2 && age <= chosenAge + 2) className = 'bg-warning';

  let arrow = '';

  if (age < chosenAge) arrow = 'fa fa-arrow-up';
  else if (age > chosenAge) arrow = 'fa fa-arrow-down';

  return (
    <td className={className}>
      <span>
        {age}
        <br />
      </span>
      {arrow ? <i className={arrow} /> : null}
    </td>
  );
};
