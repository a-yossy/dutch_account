import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { OmitStrict } from 'src/types/omitStrict';

type OneLineCardProps = OmitStrict<
  BoxProps,
  'width' | 'boxShadow' | 'rounded' | 'height' | 'display' | 'alignItems'
>;

export const OneLineCard: FC<OneLineCardProps> = ({ children, ...props }) => (
  <Box
    width={400}
    boxShadow='dark-lg'
    rounded='md'
    height={12}
    display='flex'
    alignItems='center'
    {...props}
  >
    {children}
  </Box>
);
