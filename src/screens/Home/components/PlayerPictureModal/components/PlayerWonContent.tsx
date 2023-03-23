import { Row } from 'react-bootstrap';

import { useCountDown } from '@hooks';
import { usePoeltlStore } from '@stores';

type Props = {
  playerName: string;
  numGuesses: number;
};

export const PlayerWonContent = ({ numGuesses, playerName }: Props) => {
  const countDownTime = useCountDown();
  const { playerGuesses, chosenPlayerId } = usePoeltlStore();

  const won = playerGuesses.map(({ id }) => id).includes(chosenPlayerId);

  return (
    <>
      <Row className='mystery-container mt-5'>
        {won ? <p className='mystery-text pt-3'>Great job!</p> : null}
        <br />
        <h4>{playerName}</h4>
        {won ? <p className='mystery-text'>{`You solved it in ${numGuesses} guesses`}</p> : null}
      </Row>
      <Row>
        <p className='m-0'>New mystery player in</p>
        <br />
        <h5>{countDownTime}</h5>
      </Row>
    </>
  );
};
