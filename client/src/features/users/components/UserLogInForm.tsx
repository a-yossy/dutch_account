import { FC } from 'react';
import { OutlineButton } from 'src/components/elements';
import { Form, InputField } from 'src/components/parts';
import { LogInSchema } from 'src/features/users/formSchemas/logInSchema';
import { LogInRequest } from 'src/openapi-generator';
import { useLogIn } from 'src/features/users/api/logIn';

export const UserLogInForm: FC = () => {
  const logIn = useLogIn();

  return (
    <Form<LogInRequest, typeof LogInSchema>
      onSubmit={logIn}
      mx='auto'
      schema={LogInSchema}
    >
      {({ register, formState: { errors, isSubmitting } }) => (
        <>
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
          <OutlineButton
            colorScheme='cyan'
            type='submit'
            isLoading={isSubmitting}
            mt={5}
          >
            ログイン
          </OutlineButton>
        </>
      )}
    </Form>
  );
};
