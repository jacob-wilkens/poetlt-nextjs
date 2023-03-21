import { useMount } from './useMount';

export const useLoadBootstrap = () => {
  useMount(() => {
    /* @ts-ignore */
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  });
};
