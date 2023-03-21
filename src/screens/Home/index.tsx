import { useMemo, useRef, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';

import { usePoeltlStore } from '@stores';
import { Player } from '@types';

import { PlayerPictureModal, PlayerTable } from './components';

export const Home = () => {
  const { playerMap, chosenPlayerId, playerGuesses, setPlayerGuesses } = usePoeltlStore();

  const ref = useRef<any>(null);

  const [currentGuess, setCurrentGuess] = useState(1);
  const [guessCorrect, setGuessCorrect] = useState(false);

  const playerOptions: Option[] = useMemo(() => {
    const names = Array.from(playerMap.values()).map(({ name }) => name);
    const previousGuessedNames = playerGuesses.map(({ name }) => name);

    return names.filter((name) => !previousGuessedNames.includes(name));
  }, [playerMap, playerGuesses]);

  const playerNameMap = useMemo(() => {
    const map = new Map<string, number>();

    playerMap.forEach(({ name }, id) => {
      map.set(name, id);
    });

    return map;
  }, [playerMap]);

  const handlePlayerSelect = (selected: Option[]) => {
    if (selected.length === 1) {
      const name = selected[0] as string;

      if (!playerNameMap.has(name)) return;

      const playerId = playerNameMap.get(name)!;

      if (playerId === chosenPlayerId) {
        setGuessCorrect(true);
      } else {
        setCurrentGuess(currentGuess + 1);
      }

      const playerRecord = playerMap.get(playerId)!;
      const player: Player = { ...playerRecord, id: playerId };
      setPlayerGuesses([...playerGuesses, player]);

      ref.current.clear();
    }
  };

  //TODO: REMOVE THIS DEBUGGING CODE

  return (
    <Container className='pt-5 text-center'>
      <Row>{JSON.stringify(playerMap.get(chosenPlayerId)!)}</Row>
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
              disabled={currentGuess > 8 || guessCorrect}
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
        </Col>
      </Row>
    </Container>
  );
};
