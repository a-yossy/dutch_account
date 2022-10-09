import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';
import theme from 'src/components/layouts/theme';
import useSwrValue from 'src/hooks/useSwrValue';
import NextPageWithLayout from 'src/types/nextPageWithLayout';
import CurrentUser from 'src/components/CurrentUser';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const swrValue = useSwrValue();

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <SWRConfig value={swrValue}>
          {getLayout(<Component {...pageProps} />)}
          <CurrentUser />
        </SWRConfig>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default MyApp;
