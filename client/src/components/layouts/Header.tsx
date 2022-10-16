import { FC } from 'react';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import LoadingHeader from './LoadingHeader';
import SignedInHeader from './SignedInHeader';
import UnSignedInHeader from './UnSignedInHeader';

const Header: FC = () => {
  const currentUser = useGetCurrentUser();

  if (currentUser.state === 'loading') return <LoadingHeader />;
  if (currentUser.state === 'sign_out') return <UnSignedInHeader />;

  return <SignedInHeader currentUser={currentUser.data} />;
};

export default Header;
