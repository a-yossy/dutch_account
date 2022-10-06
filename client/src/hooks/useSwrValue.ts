import type { SWRConfiguration } from 'swr';
import useRequireLogin from 'src/hooks/useRequireLogin';
import isResponseError from 'src/libs/isResponseError';

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
