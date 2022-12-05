import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Text, Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, OutlineButton } from 'src/components/elements';
import { LogInSchema } from 'src/features/log_in/formSchemas/logInSchema';
import { LogInRequest } from 'src/openapi-generator';
import { useLogIn } from 'src/features/log_in/hooks/useLogIn';

const LogInPage: NextPage = () => {
  const logIn = useLogIn();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LogInRequest>({ resolver: zodResolver(LogInSchema) });

  return (
    <>
      <Text fontSize='xl' align='center'>
        ログイン
      </Text>
      <Box as='form' onSubmit={handleSubmit(logIn)} width={350} mx='auto'>
        <Input
          error={errors.email}
          id='email'
          formLabel='メールアドレス'
          type='email'
          register={register('email')}
          placeholder='email@example.com'
          mt={5}
        />
        <Input
          error={errors.password}
          id='password'
          formLabel='パスワード'
          type='password'
          register={register('password')}
          mt={5}
        />
        <OutlineButton
          colorScheme='cyan'
          type='submit'
          isLoading={isSubmitting}
          mt={5}
        >
          ログイン
        </OutlineButton>
      </Box>
    </>
  );
};

export default LogInPage;
