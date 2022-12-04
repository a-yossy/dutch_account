import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from 'src/components/InputForm';
import { OutlineButton } from 'src/components/OutlineButton';
import { SignUpSchema } from 'src/features/sign_up/formSchemas/signUpSchema';
import { SignUpForm } from 'src/features/sign_up/types/signUpForm';
import { useSignUp } from 'src/features/sign_up/hooks/useSignUp';

const SignUpPage: NextPage = () => {
  const signUp = useSignUp();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <>
      <Text fontSize='xl' align='center'>
        新規登録
      </Text>
      <Box as='form' onSubmit={handleSubmit(signUp)} width={350} mx='auto'>
        <InputForm
          error={errors.name}
          id='name'
          formLabel='名前'
          type='text'
          register={register('name')}
          placeholder='taro'
          mt={5}
        />
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
        <InputForm
          error={errors.password_confirmation}
          id='password_confirmation'
          formLabel='確認用パスワード'
          type='password'
          register={register('password_confirmation')}
          mt={5}
        />
        <OutlineButton
          colorScheme='cyan'
          type='submit'
          isLoading={isSubmitting}
          mt={5}
        >
          登録
        </OutlineButton>
      </Box>
    </>
  );
};

export default SignUpPage;
