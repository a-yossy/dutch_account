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
  register: UseFormRegisterReturn;
  mt: FormControlProps['mt'];
  id: string;
  formLabel: string;
  type: InputProps['type'];
  placeholder?: InputProps['placeholder'];
};

const Form: FC<FormProps> = ({
  error,
  register,
  mt,
  id,
  formLabel,
  type,
  placeholder,
}) => (
  <FormControl isInvalid={typeof error !== 'undefined'} mt={mt}>
    <FormLabel htmlFor={id}>{formLabel}</FormLabel>
    <Input type={type} placeholder={placeholder} id={id} {...register} />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);

Form.defaultProps = {
  placeholder: undefined,
};

export default Form;
