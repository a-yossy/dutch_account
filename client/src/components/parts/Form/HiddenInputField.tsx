import { FC } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

type HiddenInputFieldProps = {
  value: InputProps['value'];
};

export const HiddenInputField: FC<HiddenInputFieldProps> = ({ value }) => (
  <Input type='hidden' value={value} />
);
