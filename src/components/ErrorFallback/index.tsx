import { Alert, Container } from 'react-bootstrap';

export function ErrorFallback() {
  return (
    <Container className='d-flex justify-content-center align-items-center mt-5'>
      <Alert variant='danger'>
        <Alert.Heading>Oops, something went wrong!</Alert.Heading>
        <p>We apologize for the inconvenience. Our team has been notified and will investigate the issue.</p>
      </Alert>
    </Container>
  );
}
