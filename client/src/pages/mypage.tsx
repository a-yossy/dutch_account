import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import useSignInUser from 'src/hooks/useSignInUser';
import useRequireLogin from 'src/hooks/useRequireLogin';

const Mypage: NextPage = () => {
  const { signInUser, error, isValidating } = useSignInUser();
  useRequireLogin(isValidating, error);

  if (!signInUser) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        マイページ
      </Text>
      {signInUser.name}
    </>
  );
};

export default Mypage;
