import { Box, BoxProps } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { OmitStrict } from 'src/types/omitStrict';
import { ZodType } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
} & OmitStrict<BoxProps, 'onSubmit' | 'children'>;

export const Form = <TFormValues extends FieldValues, Schema extends ZodType>({
  onSubmit,
  schema,
  children,
  ...props
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ resolver: zodResolver(schema) });

  return (
    <Box as='form' onSubmit={methods.handleSubmit(onSubmit)} {...props}>
      {children(methods)}
    </Box>
  );
};
