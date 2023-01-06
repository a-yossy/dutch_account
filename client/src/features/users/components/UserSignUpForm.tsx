import { FC } from 'react';
import { InputField, Form } from 'src/components/parts';
import { OutlineButton } from 'src/components/elements/Button/OutlineButton';
import { SignUpSchema } from 'src/features/users/formSchemas/signUpSchema';
import { SignUpForm } from 'src/features/users/types';
import { useSignUp } from 'src/features/users/api/signUp';

export const UserSignUpForm: FC = () => {
  const signUp = useSignUp();

  return (
    <Form<SignUpForm, typeof SignUpSchema>
      onSubmit={signUp}
      mx='auto'
      schema={SignUpSchema}
      width={350}
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
  );
};
