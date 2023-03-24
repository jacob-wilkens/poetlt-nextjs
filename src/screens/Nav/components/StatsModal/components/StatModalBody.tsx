import { Col, Container, ProgressBar, Row } from 'react-bootstrap';

import { usePoeltlStore } from '@stores';
import { Streaks } from '@types';

export const StatModalBody = () => {
  const { history } = usePoeltlStore();
  const totalGames = history.size;

  const { currentStreak, longestStreak, winPct, winDistribution } = getCurrentStreaks(history);

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h4 className='stat-title'>
            GAMES <br /> PLAYED
          </h4>
          <p className='stat-description'>{totalGames}</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            LONGEST <br /> STREAK
          </h4>
          <p className='stat-description'>{longestStreak}</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            CURRENT <br /> STREAK
          </h4>
          <p className='stat-description'>{currentStreak}</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            WIN <br /> PERCENTAGE
          </h4>
          <p className='stat-description'>{winPct}%</p>
        </Col>
      </Row>
      <Row className='text-center'>
        <h4>Guess Distribution</h4>
      </Row>
      {Array.from({ length: 8 }, (_, index) => {
        const rowIndex = index + 1;

        const winCount = winDistribution.has(rowIndex) ? (winDistribution.get(rowIndex)! / totalGames) * 100 : undefined;

        return (
          <Row key={rowIndex}>
            <Col xs={1}>{rowIndex}</Col>
            <Col className='text-start'>
              <ProgressBar animated now={winCount} />
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

function getCurrentStreaks(gameResults: Map<string, number>): Streaks {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let wins = 0;

  const winDistribution = new Map<number, number>();

  for (const result of gameResults.values()) {
    if (result > 0 && result !== -1) {
      currentStreak++;
      tempStreak++;
      wins++;

      winDistribution.set(result, (winDistribution.get(result) || 0) + 1);

      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
      currentStreak = 0;
    }
  }

  return { currentStreak, longestStreak, winPct: gameResults.size === 0 ? 0 : (wins / gameResults.size) * 100, winDistribution };
}
