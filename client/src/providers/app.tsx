import { ReactNode, FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';
import { theme } from 'src/libs/theme';
import { useSwrValue } from 'src/hooks/useSwrValue';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const swrValue = useSwrValue();

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <SWRConfig value={swrValue}>{children}</SWRConfig>
      </ChakraProvider>
    </RecoilRoot>
  );
};
