import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type OutlineButtonProps = {
  title: string;
} & Omit<ChakraButtonProps, 'variant'>;

const OutlineButton: FC<OutlineButtonProps> = ({ title, ...props }) => (
  <ChakraButton variant='outline' {...props}>
    {title}
  </ChakraButton>
);

export default OutlineButton;
