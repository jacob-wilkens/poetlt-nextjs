import { Col, Container, ProgressBar, Row } from 'react-bootstrap';

export const StatModalBody = () => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h4 className='stat-title'>
            GAMES <br /> PLAYED
          </h4>
          <p className='stat-description'>0</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            LONGEST <br /> STREAK
          </h4>
          <p className='stat-description'>0</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            CURRENT <br /> STREAK
          </h4>
          <p className='stat-description'>0</p>
        </Col>
        <Col xs={3}>
          <h4 className='stat-title'>
            WIN <br /> PERCENTAGE
          </h4>
          <p className='stat-description'>0%</p>
        </Col>
      </Row>
      <Row className='text-center'>
        <h4>Guess Distribution</h4>
      </Row>
      {Array.from({ length: 8 }, (_, index) => {
        const rowIndex = index + 1;
        return (
          <Row key={rowIndex}>
            <Col xs={1}>{rowIndex}</Col>
            <Col className='text-start'>
              <ProgressBar animated now={rowIndex} />
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
