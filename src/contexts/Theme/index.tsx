import { ReactNode, createContext, useContext, useState } from 'react';

import { setCookie } from 'cookies-next';

import { Theme, ThemeContextType, ThemeType } from '@types';

const DEFAULT_THEMES: Theme[] = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
];

function modifyDOM(theme: ThemeType) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  setCookie('theme', theme, { maxAge: 30 * 24 * 60 * 60 * 1000, path: '/' });
}

const ThemeContext = createContext<ThemeContextType>(null!);

export const useTheme = () => useContext(ThemeContext);

type Props = {
  preferredTheme: ThemeType;
  children: ReactNode;
};

export default function ThemeProvider({ children, preferredTheme }: Props) {
  const [mode, setMode] = useState(preferredTheme);

  function setTheme(theme: ThemeType) {
    modifyDOM(theme);
    setMode(theme);
  }

  return <ThemeContext.Provider value={{ theme: mode, setTheme, themes: DEFAULT_THEMES }}>{children}</ThemeContext.Provider>;
}
