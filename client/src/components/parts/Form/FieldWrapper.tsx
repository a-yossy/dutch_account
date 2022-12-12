import { FC, ReactNode } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  FormControl,
  FormControlProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { OmitStrict } from 'src/types/omitStrict';

type FieldWrapperProps = {
  error: FieldError | undefined;
  id?: FormLabelProps['htmlFor'];
  formLabel?: FormLabelProps['children'];
  children: ReactNode;
} & FormControlProps;

export type FieldWrapperPassThroughProps = OmitStrict<
  FieldWrapperProps,
  'children'
>;

export const FieldWrapper: FC<FieldWrapperProps> = ({
  error,
  id,
  formLabel,
  children,
  ...props
}) => (
  <FormControl isInvalid={error !== undefined} {...props}>
    <FormLabel htmlFor={id}>{formLabel}</FormLabel>
    {children}
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);
