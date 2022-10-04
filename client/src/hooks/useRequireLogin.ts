import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import useToast from 'src/hooks/useToast';
import { ResponseError } from 'openapi-generator/api';

const useRequireLogin = (
  isValidating: boolean,
  error: AxiosError<ResponseError> | undefined
) => {
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    if (isValidating || !error) return;
    if (error.response !== undefined && error.response.status === 401) {
      void router.push('/sign_in');
      toast(
        'error',
        'アクセスできません',
        error.response.data.messages.join('\n')
      );
    }
  }, [error, router, toast, isValidating]);
};

export default useRequireLogin;
