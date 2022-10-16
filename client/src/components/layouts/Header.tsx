import { FC } from 'react';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import LoadingHeader from './LoadingHeader';
import SignedInHeader from './SignedInHeader';
import UnSignedInHeader from './UnSignedInHeader';

const Header: FC = () => {
  const currentUser = useGetCurrentUser();

  if (currentUser === undefined) return <LoadingHeader />;
  if (currentUser === null) return <UnSignedInHeader />;

  return <SignedInHeader currentUser={currentUser} />;
};

export default Header;
