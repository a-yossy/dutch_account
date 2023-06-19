import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { UserSignUpForm } from 'src/features/users/components/UserSignUpForm';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

export const UserSignUp: FC = () => {
  const alreadyLoggedIn = useAlreadyLoggedIn();
  alreadyLoggedIn();

  return (
    <>
      <CenterTitle>新規登録</CenterTitle>
      <UserSignUpForm />
    </>
  );
};
