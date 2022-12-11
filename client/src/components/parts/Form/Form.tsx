import { Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

type FormProps<TFormValues extends Record<string, unknown>, Schema> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
};

export const Form = <
  TFormValues extends Record<string, unknown>,
  Schema extends ZodType
>({
  onSubmit,
  schema,
  children,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ resolver: zodResolver(schema) });

  return (
    <Box
      as='form'
      onSubmit={methods.handleSubmit(onSubmit)}
      width={350}
      mx='auto'
    >
      {children(methods)}
    </Box>
  );
};
