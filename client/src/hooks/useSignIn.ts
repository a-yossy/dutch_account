import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserApi, SignInRequest } from 'openapi-generator/api';
import { isResponseError } from 'src/libs/isResponseError';
import { useToast } from 'src/hooks/useToast';
import { setAuthCookies } from 'src/libs/setAuthCookies';

export const useSignIn = () => {
  const toast = useToast();
  const router = useRouter();
  const signIn = useCallback(
    async (params: SignInRequest) => {
      try {
        const response = await new UserApi().signIn({
          email: params.email,
          password: params.password,
        });
        setAuthCookies(response.headers);
        await router.push('/mypage');
        toast('success', 'サインインしました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            'サインインに失敗しました',
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

  return signIn;
};
