import { FC } from 'react';
import useCurrentUser from 'src/hooks/useCurrentUser';
import LoadingHeader from './LoadingHeader';
import SignedInHeader from './SignedInHeader';
import UnSignedInHeader from './UnSignedInHeader';

const Header: FC = () => {
  const currentUser = useCurrentUser();

  if (currentUser === undefined) return <LoadingHeader />;
  if (currentUser === null) return <UnSignedInHeader />;

  return <SignedInHeader currentUser={currentUser} />;
};

export default Header;
