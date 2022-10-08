import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import Layout from 'src/components/layouts/Layout';
import theme from 'src/components/layouts/theme';
import useSwrValue from 'src/hooks/useSwrValue';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const swrValue = useSwrValue();

  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default MyApp;
