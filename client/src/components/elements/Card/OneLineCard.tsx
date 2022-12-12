import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { OmitStrict } from 'src/types/omitStrict';

type OneLineCardProps = OmitStrict<BoxProps, 'display' | 'alignItems'>;

export const OneLineCard: FC<OneLineCardProps> = ({ children, ...props }) => (
  <Box display='flex' alignItems='center' {...props}>
    {children}
  </Box>
);
