import { FC, ReactNode } from 'react';
import { Text } from '@chakra-ui/react';

type TitleProps = {
  children: ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => (
  <Text fontSize='xl' align='center'>
    {children}
  </Text>
);
