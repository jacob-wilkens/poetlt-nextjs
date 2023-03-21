import Table from 'react-bootstrap/Table';

import { Player } from '@types';

import { PlayerRow } from './components';

type Props = {
  players: Player[];
};

const COLUMNS = ['PLAYER', 'TEAM', 'CONF', 'DIV', 'POS', 'HT', 'AGE', '#'];

export const PlayerTable = ({ players }: Props) => {
  return (
    <Table responsive bordered striped size='sm'>
      <thead className='text-center'>
        <tr>
          {COLUMNS.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className='text-center align-middle'>
        {players.map((player, index) => (
          <PlayerRow key={index} {...{ player }} />
        ))}
      </tbody>
    </Table>
  );
};
