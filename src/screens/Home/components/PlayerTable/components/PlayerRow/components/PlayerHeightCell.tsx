import { usePoeltlStore } from '@stores';

type Props = {
  height: string;
};

function convertHeight(height: string): number {
  const [feet, inches] = height.split('-');
  return +feet * 12 + +inches;
}

export const PlayerHeightCell = ({ height }: Props) => {
  const { chosenPlayerId, playerMap } = usePoeltlStore();
  const { height: chosenHeight } = playerMap.get(chosenPlayerId)!;

  const heightInInches = convertHeight(height);
  const chosenHeightInInches = convertHeight(chosenHeight);

  let className = '';

  if (height === chosenHeight) className = 'bg-success';
  else if (heightInInches >= chosenHeightInInches - 2 && heightInInches <= chosenHeightInInches + 2) className = 'bg-warning';

  let arrow = '';

  if (heightInInches < chosenHeightInInches) arrow = 'fa fa-arrow-up';
  else if (heightInInches > chosenHeightInInches) arrow = 'fa fa-arrow-down';

  return (
    <td className={className}>
      <span>
        {height}
        <br />
      </span>
      {arrow ? <i className={arrow} /> : null}
    </td>
  );
};
