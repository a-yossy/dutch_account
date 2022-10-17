import { FC } from 'react';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import { LoadingHeader } from 'src/components/layouts/LoadingHeader';
import { LoggedInHeader } from 'src/components/layouts/LoggedInHeader';
import { UnLoggedInHeader } from 'src/components/layouts/UnLoggedInHeader';

export const Header: FC = () => {
  const currentUser = useGetCurrentUser();

  if (currentUser.state === 'loading') return <LoadingHeader />;
  if (currentUser.state === 'log_out') return <UnLoggedInHeader />;

  return <LoggedInHeader currentUser={currentUser.data} />;
};
