import { CSSProperties } from 'react';

import Image from 'react-bootstrap/Image';

import { Container, Row } from 'react-bootstrap';

import { usePoeltlStore } from '@stores';

import { PlayerContent } from './PlayerContent';
import { PlayerWonContent } from './PlayerWonContent';

const getPlayerPicture = (playerId: number) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

const style: CSSProperties = { filter: 'contrast(0%) brightness(0%)' };

export const PlayerPictureModalBody = () => {
  const { chosenPlayerId, playerGuesses, playerMap } = usePoeltlStore();
  const url = getPlayerPicture(chosenPlayerId);
  const won = playerGuesses.map(({ id }) => id).includes(chosenPlayerId);
  const maxGuesses = playerGuesses.length === 8;

  const { name: playerName } = playerMap.get(chosenPlayerId)!;

  //TODO: convert to next image
  return (
    <Container fluid className='text-center px-5'>
      <Row>
        <Image alt='Player to be guessed' className='bg-image' src={url} fluid style={won || maxGuesses ? {} : style} />
      </Row>
      {won || maxGuesses ? <PlayerWonContent {...{ playerName, numGuesses: playerGuesses.length }} /> : <PlayerContent />}
    </Container>
  );
};
