import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { useCallback } from 'react';
import { useGetCurrentUser } from 'src/recoil/currentUserState';

export const useAlreadyLoggedIn = () => {
  const router = useRouter();
  const toast = useToast();
  const currentUser = useGetCurrentUser();
  const alreadyLoggedIn = useCallback(() => {
    if (currentUser.state === 'log_in') {
      void router.push('/mypage');
      toast('error', 'ログイン済みです');
    }
  }, [currentUser, router, toast]);

  return alreadyLoggedIn;
};
