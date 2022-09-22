import { FC } from 'react';
import {
  Button,
  ButtonProps,
} from '@chakra-ui/react';

type OutlineButtonProps = {
  title: string;
} & Omit<ButtonProps, 'variant'>;

const OutlineButton: FC<OutlineButtonProps> = ({ title, ...props }) => (
  <Button variant='outline' {...props}>
    {title}
  </Button>
);

export default OutlineButton;
