import { useCallback } from 'react';
import { useRouter } from 'next/router';
import useToast from 'src/hooks/useToast';
import SomeRequired from 'src/types/someRequired';
import AxiosResponseError from 'src/types/axiosResponseError';

const useRequireLogin = () => {
  const router = useRouter();
  const toast = useToast();
  const requireLogin = useCallback(
    (error: SomeRequired<AxiosResponseError, 'response'>) => {
      void router.push('/sign_in');
      toast(
        'error',
        'アクセスできません',
        error.response.data.messages.join('\n')
      );
    },
    [router, toast]
  );

  return requireLogin;
};

export default useRequireLogin;
