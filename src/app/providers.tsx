'use client';

import { ReactNode, useState } from 'react';

import { SSRProvider } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@components/ErrorFallback';
import ThemeProvider from '@contexts/Theme';
import { ThemeType } from '@contexts/Theme/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: ReactNode;
  preferredTheme: ThemeType;
};

export function Providers({ children, preferredTheme }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <SSRProvider>
          <ThemeProvider preferredTheme={preferredTheme}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </ThemeProvider>
        </SSRProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
