import { FC } from 'react';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from 'src/components/parts/Form/FieldWrapper';
import { Input, InputProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type: InputProps['type'];
  placeholder?: InputProps['placeholder'];
  register: UseFormRegisterReturn;
};

export const InputField: FC<InputFieldProps> = ({
  error,
  id,
  formLabel,
  type,
  placeholder,
  register,
  ...props
}) => (
  <FieldWrapper error={error} id={id} formLabel={formLabel} {...props}>
    <Input type={type} placeholder={placeholder} id={id} {...register} />
  </FieldWrapper>
);
