import { Spinner } from 'react-bootstrap';

import { useTheme } from '@contexts/Theme';

export const PoetltSpinner = () => {
  const { theme } = useTheme();

  let variant: 'light' | 'dark';

  if (theme === 'auto') {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    variant = preferredTheme === 'dark' ? 'light' : 'dark';
  } else {
    variant = theme === 'dark' ? 'light' : 'dark';
  }

  const animation = 'border';

  return <Spinner {...{ variant, animation }} />;
};
