import { Spinner } from 'react-bootstrap';

import { useTheme } from '@contexts/Theme';

export const PoetltSpinner = () => {
  const { theme } = useTheme();

  let variant: 'light' | 'dark';

  variant = theme === 'dark' ? 'light' : 'dark';

  const animation = 'border';

  return <Spinner {...{ variant, animation }} />;
};
