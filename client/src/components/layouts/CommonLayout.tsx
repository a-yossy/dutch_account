import { FC, ReactNode } from 'react';
import UnSignedInLayout from 'src/components/layouts/UnSignedInLayout';
import SignedInLayout from 'src/components/layouts/SignedInLayout';
import LoadingLayout from 'src/components/layouts/LoadingLayout';
import useCurrentUser from 'src/hooks/useCurrentUser';

type CommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const currentUser = useCurrentUser();

  if (currentUser === undefined) {
    return <LoadingLayout>{children}</LoadingLayout>;
  }
  if (currentUser === null) {
    return <UnSignedInLayout>{children}</UnSignedInLayout>;
  }

  return <SignedInLayout>{children}</SignedInLayout>;
};

export default CommonLayout;
