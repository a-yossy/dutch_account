import { FC, ReactNode } from 'react';
import SignedInHeader from 'src/components/layouts/SignedInHeader';
import useCurrentUser from 'src/hooks/useCurrentUser';
import LoadingLayout from 'src/components/layouts/LoadingLayout';
import Head from 'src/components/layouts/Head';

type SignedInLayoutProps = {
  children: ReactNode;
};

const SignedInLayout: FC<SignedInLayoutProps> = ({ children }) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <LoadingLayout>{children}</LoadingLayout>;
  }

  return (
    <>
      <Head />
      <SignedInHeader currentUser={currentUser} />
      <main>{children}</main>
    </>
  );
};

export default SignedInLayout;
