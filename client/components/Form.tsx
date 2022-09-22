import { FC } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputProps,
  FormControlProps,
} from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FormProps = {
  error: FieldError | undefined;
  id: string;
  formLabel: string;
  type: InputProps['type'];
  placeholder?: InputProps['placeholder'];
  register: UseFormRegisterReturn;
} & FormControlProps;

const Form: FC<FormProps> = ({
  error,
  id,
  formLabel,
  type,
  placeholder,
  register,
  ...props
}) => (
  <FormControl isInvalid={error !== undefined} {...props}>
    <FormLabel htmlFor={id}>{formLabel}</FormLabel>
    <Input type={type} placeholder={placeholder} id={id} {...register} />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);

export default Form;
