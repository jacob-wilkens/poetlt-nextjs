import { Row } from 'react-bootstrap';

import { useCountDown } from '@hooks';

type Props = {
  playerName: string;
  numGuesses: number;
};

export const PlayerWonContent = ({ numGuesses, playerName }: Props) => {
  const countDownTime = useCountDown();

  return (
    <>
      <Row className='mystery-container mt-5'>
        <p className='mystery-text pt-3'>Great job!</p>
        <br />
        <h4>{playerName}</h4>
        <p className='mystery-text'>{`You solved it in ${numGuesses} guesses`}</p>
      </Row>
      <Row>
        <p className='m-0'>New mystery player in</p>
        <br />
        <h5>{countDownTime}</h5>
      </Row>
    </>
  );
};
