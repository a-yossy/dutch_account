import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = {
  title: string;
  colorSchema: ChakraButtonProps['colorScheme'];
  type: ChakraButtonProps['type'];
  handleClick: () => void;
  isLoading: ChakraButtonProps['isLoading'];
  mt: ChakraButtonProps['mt'];
};

const Button: FC<ButtonProps> = ({
  colorSchema,
  type,
  handleClick,
  isLoading,
  title,
  mt,
}) => (
  <ChakraButton
    variant='outline'
    colorScheme={colorSchema}
    type={type}
    onClick={handleClick}
    isLoading={isLoading}
    mt={mt}
  >
    {title}
  </ChakraButton>
);

export default Button;
