import { Component } from 'react';

import { Alert, Container } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error:', error, 'Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Alert variant='danger'>
            <Alert.Heading>Oops, something went wrong!</Alert.Heading>
            <p>We apologize for the inconvenience. Our team has been notified and will investigate the issue.</p>
          </Alert>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
