import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { UserApi, SignUpRequest } from 'openapi-generator/api';
import isResponseError from 'src/libs/isResponseError';
import useToast from 'src/hooks/useToast';

const useSignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const signUp = useCallback(async (params: SignUpRequest) => {
    try {
      const response = await new UserApi().signUp({
        name: params.name,
        email: params.email,
        password: params.password,
      });
      setCookie(null, 'access-token', response.headers['access-token']);
      setCookie(null, 'uid', response.headers.uid);
      setCookie(null, 'client', response.headers.client);
      await router.push('/');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signUp;
};

export default useSignUp;
