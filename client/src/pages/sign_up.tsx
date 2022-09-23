import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from 'src/components/InputForm';
import OutlineButton from 'src/components/OutlineButton';
import { SignUpSchema, SignUpForm } from 'src/formSchemas/signUpSchema';
import ResponseErrorSchema from 'src/formSchemas/responseErrorSchema';
import { UserApi, SignUpRequest } from 'openapi-generator/api';
import axios from 'axios';
import { setCookie } from 'nookies';
import useToast from 'src/hooks/toast';

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });

  const toast = useToast();
  const router = useRouter();

  const signUp = async (params: SignUpRequest) => {
    try {
      const response = await new UserApi().signUp({
        name: params.name,
        email: params.email,
        password: params.password,
      });
      setCookie(null, 'access-token', response.headers['access-token']);
      setCookie(null, 'uid', response.headers.uid);
      setCookie(null, 'client', response.headers.client);
      void router.push('/');
      toast('success', 'サインアップしました');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response !== undefined) {
        const responseError = ResponseErrorSchema.safeParse(
          error.response.data
        );
        if (responseError.success) {
          toast(
            'error',
            'サインアップに失敗しました',
            responseError.data.messages.join(`\n`)
          );
        }
      }
    }
  };

  return (
    <>
      <Text fontSize='xl' align='center'>
        サインアップ
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
          title='作成'
          colorScheme='cyan'
          type='submit'
          isLoading={isSubmitting}
          mt={5}
        />
      </Box>
    </>
  );
};

export default SignUp;
