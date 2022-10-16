import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { UserApi } from 'openapi-generator/api';
import getAuthCookies from 'src/libs/getAuthCookies';
import isResponseError from 'src/libs/isResponseError';
import useToast from 'src/hooks/useToast';
import destroyAuthCookies from 'src/libs/destroyAuthCookies';

const useSignOut = () => {
  const toast = useToast();
  const router = useRouter();
  const signOut = useCallback(async () => {
    try {
      await new UserApi().signOut({ headers: getAuthCookies() });
      destroyAuthCookies();
      await router.push('/');
      toast('success', 'サインアウトしました');
    } catch (error: unknown) {
      if (isResponseError(error)) {
        toast(
          'error',
          'サインアウトに失敗しました',
          error.response.data.messages.join('\n')
        );
      }
    }
  }, [router, toast]);

  return signOut;
};

export default useSignOut;
