import { usePoeltlStore } from '@stores';
import { Player } from '@types';

import { PlayerAgeCell, PlayerConferenceCell, PlayerDivisionCell, PlayerHeightCell, PlayerNameCell, PlayerNumberCell, PlayerPositionCell, PlayerTeamCell } from './components';

type Props = {
  player: Player;
};

export const PlayerRow = ({ player }: Props) => {
  const { id, name: playerName, age, height, number, pos: position, teamId } = player;
  const { teamMap } = usePoeltlStore();

  const { abbreviation, conference, division, name: teamName } = teamMap.get(teamId)!;

  return (
    <tr key={id}>
      <PlayerNameCell {...{ playerName }} />
      <PlayerTeamCell {...{ abbreviation, teamId, teamName }} />
      <PlayerConferenceCell {...{ conference }} />
      <PlayerDivisionCell {...{ division }} />
      <PlayerPositionCell {...{ position }} />
      <PlayerHeightCell {...{ height }} />
      <PlayerAgeCell {...{ age }} />
      <PlayerNumberCell {...{ number }} />
    </tr>
  );
};
