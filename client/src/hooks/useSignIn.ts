import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { UserApi, SignInRequest } from 'openapi-generator/api';
import isResponseError from 'src/libs/isResponseError';
import useToast from 'src/hooks/useToast';
import setCookies from 'src/libs/setCookies';

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
        setCookies(response.headers);
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
