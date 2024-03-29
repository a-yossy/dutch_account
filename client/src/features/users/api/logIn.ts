import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserApi, LogInRequest } from 'src/openapi-generator';
import { isResponseError } from 'src/libs/isResponseError';
import { useToast } from 'src/hooks/useToast';
import { setAuthCookies } from 'src/libs/nookies/setAuthCookies';

export const useLogIn = () => {
  const toast = useToast();
  const router = useRouter();
  const logIn = useCallback(
    async (params: LogInRequest) => {
      try {
        const response = await new UserApi().logIn(params);
        setAuthCookies(response.headers);
        await router.push('/mypage');
        toast('success', 'ログインしました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            'ログインに失敗しました',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [router, toast]
  );

  useEffect(() => {
    void router.prefetch('/mypage');
  }, [router]);

  return logIn;
};
