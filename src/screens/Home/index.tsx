'use client';

import { useEffect, useRef } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';

import { PoetltSpinner } from '@components/Spinner';
import { PoetltToast } from '@components/Toast';
import { usePlayerNameMap, usePlayerOptions, useSubmitToken } from '@hooks';
import { useWindowHeight } from '@react-hook/window-size';
import { usePoeltlStore } from '@stores';

import { PlayerPictureModal, PlayerTable } from './components';

export const Home = () => {
  const { playerGuesses, currentGuess, guessCorrect } = usePoeltlStore((state) => {
    const { chosenPlayerId, playerGuesses } = state;

    const playerIds = playerGuesses.map(({ id }) => id);
    const guessCorrect = playerIds.includes(chosenPlayerId);

    return { playerGuesses, currentGuess: guessCorrect ? playerGuesses.length : playerGuesses.length + 1, guessCorrect };
  });

  const playerOptions = usePlayerOptions();
  const playerNameMap = usePlayerNameMap();

  const ref = useRef<any>(null);

  const body = useRef<HTMLDivElement>(null);

  const windowHeight = useWindowHeight({ initialHeight: 0 });
  const rowsHeight = body.current?.offsetHeight ?? 0;
  const tableHeight = windowHeight - rowsHeight - 85;

  const { isError, isLoading, mutate: postToken, error } = useSubmitToken({ url: '/api/token' });

  useEffect(() => {
    if (isLoading) ref.current?.blur();
    else ref.current?.focus();
  }, [isLoading]);

  const handlePlayerSelect = (selected: Option[]) => {
    if (selected.length === 1) {
      const name = selected[0] as string;

      if (!playerNameMap.has(name)) return;

      const playerId = playerNameMap.get(name)!;

      postToken({ playerId });

      ref.current?.clear();
    }
  };

  let placeHolderText = '';

  if (currentGuess > 8) placeHolderText = 'You ran out of guesses!';
  else if (guessCorrect) placeHolderText = `You solved it in ${currentGuess} guesses!`;
  else placeHolderText = `Guess ${currentGuess} of 8`;

  return (
    <Container className='pt-lg-2 text-center pt-0'>
      <div ref={body}>
        <Row>
          <h1>POELTL</h1>
        </Row>
        <Row>
          <h4>NBA PLAYER GUESSING GAME</h4>
        </Row>
        <Row>
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
                disabled={currentGuess > 8 || guessCorrect || isLoading}
              />
            </Form.Group>
          </Col>
          <Col xl={2} lg={2} md={0} />
        </Row>
        <Row>
          <Col>
            <PlayerPictureModal />
          </Col>
        </Row>
      </div>
      <Row className='overflow-auto' style={{ height: tableHeight }}>
        <Col xl={2} lg={2} md={0} />
        <Col xl={8} lg={8} md={12}>
          <PlayerTable {...{ players: playerGuesses }} />
          {isLoading ? <PoetltSpinner /> : null}
        </Col>
        <Col xl={2} lg={2} md={0} />
      </Row>
      {isError ? <PoetltToast position='top-end' autohide bg='danger' delay={5000} message={error ? error?.message : 'Something went wrong'} /> : null}
    </Container>
  );
};
