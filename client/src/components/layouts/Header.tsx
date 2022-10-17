import { FC } from 'react';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import { LoadingHeader } from 'src/components/layouts/LoadingHeader';
import { SignedInHeader } from 'src/components/layouts/SignedInHeader';
import { UnSignedInHeader } from 'src/components/layouts/UnSignedInHeader';

export const Header: FC = () => {
  const currentUser = useGetCurrentUser();

  if (currentUser.state === 'loading') return <LoadingHeader />;
  if (currentUser.state === 'sign_out') return <UnSignedInHeader />;

  return <SignedInHeader currentUser={currentUser.data} />;
};
