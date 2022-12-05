import { FC } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input as NextInput,
  InputProps as NextInputProps,
  FormControlProps,
  FormLabelProps,
} from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  error: FieldError | undefined;
  id?: FormLabelProps['htmlFor'];
  formLabel?: FormLabelProps['children'];
  type: NextInputProps['type'];
  placeholder?: NextInputProps['placeholder'];
  value?: NextInputProps['value'];
  step?: NextInputProps['step'];
  register: UseFormRegisterReturn;
} & FormControlProps;

export const Input: FC<InputProps> = ({
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
    <NextInput
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
