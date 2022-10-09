import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from 'src/components/InputForm';
import OutlineButton from 'src/components/OutlineButton';
import SignInSchema from 'src/formSchemas/signInSchema';
import { SignInRequest } from 'openapi-generator/api';
import useSignIn from 'src/hooks/useSignIn';
import UnSignedInLayout from 'src/components/layouts/UnSignedInLayout';
import type NextPageWithLayout from 'src/types/nextPageWithLayout';

const SignIn: NextPageWithLayout = () => {
  const signIn = useSignIn();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequest>({ resolver: zodResolver(SignInSchema) });

  return (
    <>
      <Text fontSize='xl' align='center'>
        サインイン
      </Text>
      <Box as='form' onSubmit={handleSubmit(signIn)} width={350} mx='auto'>
        <InputForm
          error={errors.email}
          id='email'
          formLabel='メールアドレス'
          type='email'
          register={register('email')}
          placeholder='email@example.com'
          mt={5}
        />
        <InputForm
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
          サインイン
        </OutlineButton>
      </Box>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => (
  <UnSignedInLayout>{page}</UnSignedInLayout>
);

export default SignIn;
