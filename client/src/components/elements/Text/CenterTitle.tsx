import { FC } from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { OmitStrict } from 'src/types/omitStrict';

type TitleProps = OmitStrict<TextProps, 'fontSize' | 'align'>;

export const CenterTitle: FC<TitleProps> = ({ children, ...props }) => (
  <Text fontSize='xl' align='center' {...props}>
    {children}
  </Text>
);
