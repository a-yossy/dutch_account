import type { SWRConfiguration } from 'swr';
import { useRequireLogin } from 'src/hooks/useRequireLogin';

export const useSwrValue = () => {
  const requireLogin = useRequireLogin();
  const swrValue: SWRConfiguration = {
    onError: (error: unknown) => {
      requireLogin(error);
    },
  };

  return swrValue;
};
