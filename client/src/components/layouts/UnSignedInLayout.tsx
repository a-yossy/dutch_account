import { FC, ReactNode } from 'react';
import UnSignedInHeader from 'src/components/layouts/UnSignedInHeader';
import Head from 'src/components/layouts/Head';

type UnSignedInLayoutProps = {
  children: ReactNode;
};

const UnSignedInLayout: FC<UnSignedInLayoutProps> = ({ children }) => (
  <>
    <Head />
    <UnSignedInHeader />
    <main>{children}</main>
  </>
);

export default UnSignedInLayout;
