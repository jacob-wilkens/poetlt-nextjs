import { Spinner } from 'react-bootstrap';

import { useTheme } from '@contexts/Theme';

export const PoetltSpinner = () => {
  const { theme } = useTheme();

  const variant: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
  const animation = 'border';

  return <Spinner {...{ variant, animation }} />;
};
