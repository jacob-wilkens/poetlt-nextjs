import { useState } from 'react';

import type { AppProps } from 'next/app';

import SSRProvider from 'react-bootstrap/SSRProvider';

import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@components/ErrorFallback';
import ThemeProvider from '@contexts/Theme';
import { useLoadBootstrap } from '@hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Head from './Head';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  useLoadBootstrap();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <SSRProvider>
          <ThemeProvider>
            <Head />
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </ThemeProvider>
        </SSRProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
