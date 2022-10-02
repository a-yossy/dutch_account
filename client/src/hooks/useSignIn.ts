import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { UserApi, SignInRequest } from 'openapi-generator/api';
import isResponseError from 'src/libs/isResponseError';
import useToast from 'src/hooks/useToast';

const useSignIn = () => {
  const toast = useToast();
  const router = useRouter();
  const signIn = useCallback(
    async (params: SignInRequest) => {
      try {
        const response = await new UserApi().signIn({
          email: params.email,
          password: params.password,
        });
        setCookie(null, 'access-token', response.headers['access-token']);
        setCookie(null, 'uid', response.headers.uid);
        setCookie(null, 'client', response.headers.client);
        await router.push('/');
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

  return signIn;
};

export default useSignIn;
