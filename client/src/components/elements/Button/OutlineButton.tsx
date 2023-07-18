import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { OmitStrict } from 'src/types/omitStrict';

type OutlineButtonProps = OmitStrict<ButtonProps, 'variant'> & {
  ref?: React.Ref<HTMLButtonElement>;
};

export const OutlineButton: FC<OutlineButtonProps> = ({
  children,
  ref,
  ...props
}) => (
  <Button variant='outline' {...props} ref={ref}>
    {children}
  </Button>
);
