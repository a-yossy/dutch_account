import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import OmitStrict from 'src/types/omitStrict';

type OutlineButtonProps = {
  title: string;
} & OmitStrict<ButtonProps, 'variant'>;

const OutlineButton: FC<OutlineButtonProps> = ({ title, ...props }) => (
  <Button variant='outline' {...props}>
    {title}
  </Button>
);

export default OutlineButton;
