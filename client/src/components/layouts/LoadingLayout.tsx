import { FC, ReactNode } from 'react';
import LoadingHeader from 'src/components/layouts/LoadingHeader';
import Head from 'src/components/layouts/Head';

type LoadingLayoutProps = {
  children: ReactNode;
};

const LoadingLayout: FC<LoadingLayoutProps> = ({ children }) => (
  <>
    <Head />
    <LoadingHeader />
    <main>{children}</main>
  </>
);

export default LoadingLayout;
