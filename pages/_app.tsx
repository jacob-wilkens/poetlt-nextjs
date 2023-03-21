import type { AppProps } from 'next/app';

import SSRProvider from 'react-bootstrap/SSRProvider';

import ThemeProvider from '@contexts/Theme';
import { useLoadBootstrap } from '@hooks';

import Head from './Head';
 
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  useLoadBootstrap();

  return (
    <SSRProvider>
      <ThemeProvider>
        <Head />
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRProvider>
  );
}

export default App;
