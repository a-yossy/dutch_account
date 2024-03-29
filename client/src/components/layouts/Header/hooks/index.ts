import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { UserApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { useToast } from 'src/hooks/useToast';
import { destroyAuthCookies } from 'src/libs/nookies/destroyAuthCookies';
import { useSetCurrentUser } from 'src/recoil/currentUserState';
import { useSetCurrentManagementGroup } from 'src/recoil/currentManagementGroupState';

export const useLogOut = () => {
  const toast = useToast();
  const router = useRouter();
  const setCurrentUser = useSetCurrentUser();
  const setCurrentManagementGroup = useSetCurrentManagementGroup();
  const logOut = useCallback(async () => {
    try {
      await new UserApi().logOut({ headers: getAuthCookies() });
      destroyAuthCookies();
      await router.push('/');
      toast('success', 'ログアウトしました');
      setCurrentUser({ state: 'log_out' });
      setCurrentManagementGroup({ state: 'not_existence' });
    } catch (error: unknown) {
      if (isResponseError(error)) {
        toast(
          'error',
          'ログアウトに失敗しました',
          error.response.data.messages.join('\n')
        );
      }
    }
  }, [router, setCurrentManagementGroup, setCurrentUser, toast]);

  return logOut;
};
