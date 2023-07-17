import { FC } from 'react';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from 'src/components/parts/Form/FieldWrapper';
import { Input, InputProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { OmitStrict } from 'src/types/omitStrict';

type InputFieldProps = OmitStrict<
  FieldWrapperPassThroughProps,
  'placeholder' | 'defaultValue'
> & {
  type?: InputProps['type'];
  placeholder?: InputProps['placeholder'];
  register: UseFormRegisterReturn;
  defaultValue?: InputProps['defaultValue'];
};

export const InputField: FC<InputFieldProps> = ({
  error,
  id,
  formLabel,
  type,
  placeholder,
  register,
  defaultValue,
  ...props
}) => (
  <FieldWrapper error={error} id={id} formLabel={formLabel} {...props}>
    <Input
      type={type}
      placeholder={placeholder}
      id={id}
      defaultValue={defaultValue}
      {...register}
    />
  </FieldWrapper>
);
