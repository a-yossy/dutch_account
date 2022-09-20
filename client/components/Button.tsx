import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = {
  title: string;
  colorSchema: ChakraButtonProps['colorScheme'];
  variant: ChakraButtonProps['variant'];
  type: ChakraButtonProps['type'];
  handleClick: () => void;
  isLoading: ChakraButtonProps['isLoading'];
  mt: ChakraButtonProps['mt'];
};

const Button: FC<ButtonProps> = ({
  colorSchema,
  variant,
  type,
  handleClick,
  isLoading,
  title,
  mt,
}) => (
  <ChakraButton
    colorScheme={colorSchema}
    variant={variant}
    type={type}
    onClick={handleClick}
    isLoading={isLoading}
    mt={mt}
  >
    {title}
  </ChakraButton>
);

export default Button;
