import NavDropdown from 'react-bootstrap/NavDropdown';

import { useTheme } from '@contexts/Theme';
import { ThemeType } from '@contexts/Theme/types';

export function DarkModeMenu() {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  const title = themes.find((t) => t.name.toLowerCase() === currentTheme)?.icon ?? '⚙️';

  return (
    <>
      <NavDropdown {...{ title }}>
        {themes.map((theme) => {
          const active = currentTheme === theme.name.toLowerCase();
          return (
            <NavDropdown.Item key={theme.name} onClick={() => setTheme(theme.name.toLowerCase() as ThemeType)}>
              {theme.icon} {theme.name} {active ? '✔️' : ''}
            </NavDropdown.Item>
          );
        })}
      </NavDropdown>
    </>
  );
}
