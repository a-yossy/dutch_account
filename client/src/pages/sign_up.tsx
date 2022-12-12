import type { NextPage } from 'next';
import { CenterTitle } from 'src/components/elements';
import { InputField, Form } from 'src/components/parts';
import { OutlineButton } from 'src/components/elements/Button/OutlineButton';
import { SignUpSchema } from 'src/features/sign_up/formSchemas/signUpSchema';
import { SignUpForm } from 'src/features/sign_up/types/signUpForm';
import { useSignUp } from 'src/features/sign_up/hooks/useSignUp';

const SignUpPage: NextPage = () => {
  const signUp = useSignUp();

  return (
    <>
      <CenterTitle>新規登録</CenterTitle>
      <Form<SignUpForm, typeof SignUpSchema>
        onSubmit={signUp}
        mx='auto'
        schema={SignUpSchema}
      >
        {({ register, formState: { errors, isSubmitting } }) => (
          <>
            <InputField
              error={errors.name}
              id='name'
              formLabel='名前'
              type='text'
              register={register('name')}
              placeholder='taro'
              mt={5}
            />
            <InputField
              error={errors.email}
              id='email'
              formLabel='メールアドレス'
              type='email'
              register={register('email')}
              placeholder='email@example.com'
              mt={5}
            />
            <InputField
              error={errors.password}
              id='password'
              formLabel='パスワード'
              type='password'
              register={register('password')}
              mt={5}
            />
            <InputField
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
          </>
        )}
      </Form>
    </>
  );
};

export default SignUpPage;
