import { FC, ReactNode } from 'react';
import Head from 'next/head';
import useCurrentUser from 'src/hooks/useCurrentUser';
import LoadingHeader from './LoadingHeader';
import UnSignedInHeader from './UnSignedInHeader';
import SignedInHeader from './SignedInHeader';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Head>
        <title>Dutch Account</title>
        <meta name='description' content='dutch account' />
        <link rel='icon' href='/receipt.ico' />
      </Head>
      {currentUser === undefined && <LoadingHeader />}
      {currentUser === null && <UnSignedInHeader />}
      {currentUser && <SignedInHeader currentUser={currentUser} />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
