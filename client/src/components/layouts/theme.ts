import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { type Styles } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const styles: Styles = {
  global: {
    main: {
      mt: 5,
      mb: 5,
    },
  },
};

export const theme = extendTheme({ config, styles });
