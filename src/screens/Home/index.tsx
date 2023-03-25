'use client';

import { useRef } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';

import { PoetltSpinner } from '@components/Spinner';
import { PoetltToast } from '@components/Toast';
import { useMount, usePlayerNameMap, usePlayerOptions, useSubmitToken } from '@hooks';
import { usePoeltlStore } from '@stores';
import { TokenResetSchema, TokenSchema } from '@types';

import { PlayerPictureModal, PlayerTable } from './components';

export const Home = () => {
  const { playerGuesses, decodeToken, currentGuess, guessCorrect } = usePoeltlStore((state) => {
    const { chosenPlayerId, playerGuesses, decodeToken } = state;

    const playerIds = playerGuesses.map(({ id }) => id);
    const guessCorrect = playerIds.includes(chosenPlayerId);

    return { playerGuesses, decodeToken, currentGuess: guessCorrect ? playerGuesses.length : playerGuesses.length + 1, guessCorrect };
  });

  const playerOptions = usePlayerOptions();
  const playerNameMap = usePlayerNameMap();

  const ref = useRef<any>(null);

  const { isError: isPostingTokenError, isLoading: isPostingToken, mutate: postToken, error: postTokenError } = useSubmitToken<TokenSchema>({ url: '/api/token' });
  const { isError: isResettingTokenError, isLoading: isResettingToken, mutate: resetToken, error: resetTokenError } = useSubmitToken<TokenResetSchema>({ url: '/api/token/reset' });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;

  useMount(() => {
    if (token) decodeToken(token, resetToken);
  });

  const handlePlayerSelect = (selected: Option[]) => {
    if (selected.length === 1) {
      const name = selected[0] as string;

      if (!playerNameMap.has(name)) return;

      const playerId = playerNameMap.get(name)!;

      const payload: TokenSchema = { playerId };

      if (token) payload.token = token;

      postToken(payload);

      ref.current.clear();
    }
  };

  let placeHolderText = '';

  if (currentGuess > 8) placeHolderText = 'You ran out of guesses!';
  else if (guessCorrect) placeHolderText = `You solved it in ${currentGuess} guesses!`;
  else placeHolderText = `Guess ${currentGuess} of 8`;

  return (
    <Container className='pt-lg-2 text-center pt-0'>
      <Row>
        <h1>POELTL</h1>
      </Row>
      <Row className='pt-3'>
        <h4>NBA PLAYER GUESSING GAME</h4>
      </Row>
      <Row className='pt-3'>
        <Col xl={2} lg={2} md={0} />
        <Col className='text-start' xl={8} lg={8} md={12}>
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
              placeholder={placeHolderText}
              disabled={currentGuess > 8 || guessCorrect || isPostingToken}
            />
          </Form.Group>
        </Col>
        <Col xl={2} lg={2} md={0} />
      </Row>
      <Row className='pt-3'>
        <Col>
          <PlayerPictureModal />
        </Col>
      </Row>
      <Row className='pt-3'>
        <Col xl={2} lg={2} md={0} />
        <Col xl={8} lg={8} md={12}>
          <PlayerTable {...{ players: playerGuesses }} />
          {isPostingToken || isResettingToken ? <PoetltSpinner /> : null}
        </Col>
        <Col xl={2} lg={2} md={0} />
      </Row>
      {isPostingTokenError || isResettingTokenError ? (
        <PoetltToast position='top-end' autohide bg='danger' delay={5000} message={postTokenError ? postTokenError?.message : resetTokenError ? resetTokenError?.message : 'Something went wrong'} />
      ) : null}
    </Container>
  );
};
