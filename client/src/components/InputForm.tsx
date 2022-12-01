import { FC } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputProps,
  FormControlProps,
  FormLabelProps,
} from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputFormProps = {
  error: FieldError | undefined;
  id?: FormLabelProps['htmlFor'];
  formLabel?: FormLabelProps['children'];
  type: InputProps['type'];
  placeholder?: InputProps['placeholder'];
  value?: InputProps['value'];
  step?: InputProps['step'];
  register: UseFormRegisterReturn;
} & FormControlProps;

export const InputForm: FC<InputFormProps> = ({
  error,
  id,
  formLabel,
  type,
  placeholder,
  step,
  value,
  register,
  ...props
}) => (
  <FormControl isInvalid={error !== undefined} {...props}>
    <FormLabel htmlFor={id}>{formLabel}</FormLabel>
    <Input
      type={type}
      placeholder={placeholder}
      id={id}
      step={step}
      value={value}
      {...register}
    />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);
