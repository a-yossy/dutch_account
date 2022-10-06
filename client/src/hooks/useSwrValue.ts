import useRequireLogin from 'src/hooks/useRequireLogin';
import type { SWRConfiguration } from 'swr';
import isResponseError from '../libs/isResponseError';

const useSwrValue = () => {
  const requireLogin = useRequireLogin();
  const swrValue: SWRConfiguration = {
    onError: (error) => {
      if (isResponseError(error) && error.response.status === 401) {
        requireLogin(error);
      }
    },
  };

  return swrValue;
};

export default useSwrValue;
