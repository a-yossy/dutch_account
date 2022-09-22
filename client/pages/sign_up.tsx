import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'components/Form';
import OutlineButton from 'components/OutlineButton';
import SignUpSchema from 'formSchemas/signUpSchema';
import { SignUpRequest } from 'openapi-generator/api';

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
      <Box width={350} mx='auto'>
        <form
          onSubmit={handleSubmit((values) => alert(JSON.stringify(values)))}
        >
          <Form
            error={errors.name}
            register={register('name')}
            mt={5}
            id='name'
            formLabel='名前'
            type='text'
            placeholder='taro'
          />
          <Form
            error={errors.email}
            register={register('email')}
            mt={5}
            id='email'
            formLabel='メールアドレス'
            type='email'
            placeholder='email@example.com'
          />
          <Form
            error={errors.password}
            register={register('password')}
            mt={5}
            id='password'
            formLabel='パスワード'
            type='password'
          />
          <Form
            error={errors.password_confirmation}
            register={register('password_confirmation')}
            mt={5}
            id='password_confirmation'
            formLabel='確認用パスワード'
            type='password'
          />
          <OutlineButton
            title='作成'
            colorScheme='cyan'
            type='submit'
            isLoading={isSubmitting}
            mt={5}
          />
        </form>
      </Box>
    </>
  );
};

export default SignUp;
