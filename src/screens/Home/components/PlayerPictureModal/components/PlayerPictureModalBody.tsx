import Image from 'next/image';

import { Container, Row } from 'react-bootstrap';

import { usePoeltlStore } from '@stores';

import { PlayerContent } from './PlayerContent';
import { PlayerWonContent } from './PlayerWonContent';

const getPlayerPicture = (playerId: number) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

export const PlayerPictureModalBody = () => {
  const { chosenPlayerId, playerGuesses, playerMap } = usePoeltlStore();
  const url = getPlayerPicture(chosenPlayerId);
  const won = playerGuesses.map(({ id }) => id).includes(chosenPlayerId);
  const maxGuesses = playerGuesses.length === 8;

  const { name: playerName } = playerMap.get(chosenPlayerId)!;

  return (
    <Container fluid className='text-center px-5'>
      <Row>
        <div className={`d-flex justify-content-center ${won ? undefined : 'mystery-player'}`}>
          <Image alt='Player to be guessed' src={url} width={300} height={200} />
        </div>
      </Row>
      {won || maxGuesses ? <PlayerWonContent {...{ playerName, numGuesses: playerGuesses.length }} /> : <PlayerContent />}
    </Container>
  );
};
