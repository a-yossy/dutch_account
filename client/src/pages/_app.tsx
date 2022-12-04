import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { Layout } from 'src/components/layouts/Layout';
import { RecoilRoot } from 'recoil';
import { theme } from 'src/libs/theme';
import { useSwrValue } from 'src/hooks/useSwrValue';
import { CurrentUser } from 'src/components/CurrentUser';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const swrValue = useSwrValue();

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <SWRConfig value={swrValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <CurrentUser />
        </SWRConfig>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default MyApp;
