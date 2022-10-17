import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { OmitStrict } from 'src/types/omitStrict';

type OutlineButtonProps = OmitStrict<ButtonProps, 'variant'>;

export const OutlineButton: FC<OutlineButtonProps> = ({
  children,
  ...props
}) => (
  <Button variant='outline' {...props}>
    {children}
  </Button>
);
