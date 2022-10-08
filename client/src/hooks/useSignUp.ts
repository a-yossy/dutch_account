import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserApi, SignUpRequest } from 'openapi-generator/api';
import isResponseError from 'src/libs/isResponseError';
import useToast from 'src/hooks/useToast';
import setAuthCookies from 'src/libs/setAuthCookies';

const useSignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const signUp = useCallback(
    async (params: SignUpRequest) => {
      try {
        const response = await new UserApi().signUp({
          name: params.name,
          email: params.email,
          password: params.password,
        });
        setAuthCookies(response.headers);
        await router.push('/mypage');
        toast('success', 'サインアップしました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            'サインアップに失敗しました',
            error.response.data.messages.join(`\n`)
          );
        }
      }
    },
    [router, toast]
  );

  useEffect(() => {
    void router.prefetch('/mypage');
  }, [router]);

  return signUp;
};

export default useSignUp;
