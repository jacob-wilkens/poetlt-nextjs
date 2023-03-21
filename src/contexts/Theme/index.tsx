import { ReactNode, createContext, useContext, useState } from 'react';

import { useEffectOnce } from '@hooks';

import { Theme, ThemeContextType, ThemeType } from './types';

const IS_SERVER = typeof window === 'undefined';
const DEFAULT_THEMES: Theme[] = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
  { name: 'Auto', icon: '⚙️' },
];

const storedTheme: ThemeType = IS_SERVER ? 'light' : (localStorage.getItem('theme') as ThemeType);

function modifyDOM(theme: ThemeType) {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.setAttribute('data-bs-theme', 'dark');
  else document.documentElement.setAttribute('data-bs-theme', theme);
}

function getPreferredTheme() {
  if (storedTheme) return storedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const ThemeContext = createContext<ThemeContextType>(null!);

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState(getPreferredTheme());

  useEffectOnce(() => {
    if (IS_SERVER) return;
    modifyDOM(mode);
  });

  function setTheme(theme: ThemeType) {
    modifyDOM(theme);
    localStorage.setItem('theme', theme);
    setMode(theme);
  }

  return <ThemeContext.Provider value={{ theme: mode, setTheme, themes: DEFAULT_THEMES }}>{children}</ThemeContext.Provider>;
}
