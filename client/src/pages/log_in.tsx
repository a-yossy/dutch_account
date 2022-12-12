import type { NextPage } from 'next';
import { OutlineButton, CenterTitle } from 'src/components/elements';
import { Form, InputField } from 'src/components/parts';
import { LogInSchema } from 'src/features/log_in/formSchemas/logInSchema';
import { LogInRequest } from 'src/openapi-generator';
import { useLogIn } from 'src/features/log_in/hooks/useLogIn';

const LogInPage: NextPage = () => {
  const logIn = useLogIn();

  return (
    <>
      <CenterTitle>ログイン</CenterTitle>
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
    </>
  );
};

export default LogInPage;
