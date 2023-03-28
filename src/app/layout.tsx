import { HTMLProps, ReactNode } from 'react';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Navigation } from '@screens/Nav';
import { ThemeType } from '@types';

import { Providers } from './providers';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import './styles.css';

export const metadata: Metadata = {
  title: 'Poetlt',
  description: 'NBA Player Guessing Game',
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const preferredTheme = (cookieStore.get('theme')?.value as ThemeType) || 'light';

  const htmlProps: HTMLProps<HTMLHtmlElement> = { lang: 'en' };
  // @ts-ignore
  htmlProps['data-bs-theme'] = preferredTheme;

  return (
    <html {...htmlProps}>
      <body>
        <Providers preferredTheme={preferredTheme}>
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
