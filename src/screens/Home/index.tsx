import { useRef } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';

import { PoetltSpinner } from '@components/Spinner';
import { PoetltToast } from '@components/Toast';
import { useMount, usePlayerNameMap, usePlayerOptions } from '@hooks';
import { usePoeltlStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { TokenResponse, TokenSchema } from '@types';

import { PlayerPictureModal, PlayerTable } from './components';
import { postToken } from './util';

export const Home = () => {
  const { playerGuesses, decodeToken, currentGuess, guessCorrect } = usePoeltlStore((state) => {
    const { chosenPlayerId, playerGuesses, decodeToken } = state;

    const playerIds = playerGuesses.map(({ id }) => id);
    const guessCorrect = playerIds.includes(chosenPlayerId);

    return { playerGuesses, decodeToken, currentGuess: guessCorrect ? playerGuesses.length : playerGuesses.length + 1, guessCorrect };
  });

  const playerOptions = usePlayerOptions();
  const playerNameMap = usePlayerNameMap();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;

  useMount(() => {
    if (token) decodeToken(token);
  });

  const ref = useRef<any>(null);

  const { isError, isLoading, mutate, error } = useMutation<TokenResponse, Error, TokenSchema>({
    mutationFn: (payload) => postToken(payload),
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      decodeToken(token);
    },
  });

  const handlePlayerSelect = (selected: Option[]) => {
    if (selected.length === 1) {
      const name = selected[0] as string;

      if (!playerNameMap.has(name)) return;

      const playerId = playerNameMap.get(name)!;

      const payload: TokenSchema = { playerId };

      if (token) payload.token = token;

      mutate(payload);

      ref.current.clear();
    }
  };

  return (
    <Container className='pt-5 text-center'>
      <Row>
        <h1>POELTL</h1>
      </Row>
      <Row className='pt-3'>
        <h4>NBA PLAYER GUESSING GAME</h4>
      </Row>
      <Row className='pt-3'>
        <Col className='text-start'>
          <Form.Group>
            <Form.Label>Player Selection</Form.Label>
            <Typeahead
              ref={ref}
              onChange={handlePlayerSelect}
              maxResults={5}
              clearButton
              highlightOnlyResult
              minLength={2}
              id='player-select'
              options={playerOptions}
              placeholder={guessCorrect ? `You solved it in ${currentGuess} guesses!` : `Guess ${currentGuess} of 8`}
              disabled={currentGuess >= 8 || guessCorrect}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='pt-3'>
        <Col>
          <PlayerPictureModal />
        </Col>
      </Row>
      <Row className='pt-3'>
        <Col>
          <PlayerTable {...{ players: playerGuesses }} />
          {isLoading ? <PoetltSpinner /> : null}
        </Col>
      </Row>
      {isError ? <PoetltToast position='top-end' autohide bg='danger' delay={5000} message={error?.message ?? 'Something went wrong'} /> : null}
    </Container>
  );
};
