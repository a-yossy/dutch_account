import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from 'src/components/InputForm';
import OutlineButton from 'src/components/OutlineButton';
import { SignUpSchema, SignUpRequest } from 'src/formSchemas/signUpSchema';

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <>
      <Text fontSize='xl' align='center'>
        サインアップ
      </Text>
      <Box
        as='form'
        onSubmit={handleSubmit((values) => alert(JSON.stringify(values)))}
        width={350}
        mx='auto'
      >
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
