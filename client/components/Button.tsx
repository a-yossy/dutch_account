import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = {
  title: string;
  colorSchema: ChakraButtonProps['colorScheme'];
  type: ChakraButtonProps['type'];
  isLoading: ChakraButtonProps['isLoading'];
  mt: ChakraButtonProps['mt'];
};

const Button: FC<ButtonProps> = ({
  colorSchema,
  type,
  isLoading,
  title,
  mt,
}) => (
  <ChakraButton
    variant='outline'
    colorScheme={colorSchema}
    type={type}
    isLoading={isLoading}
    mt={mt}
  >
    {title}
  </ChakraButton>
);

export default Button;
