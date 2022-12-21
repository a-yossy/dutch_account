import type { AppProps } from 'next/app';
import { Layout } from 'src/components/layouts';
import { CurrentUser } from 'src/components/functional';
import { AppProvider } from 'src/providers/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <CurrentUser />
  </AppProvider>
);

export default MyApp;
