import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import useSignInUser from 'src/hooks/useSignInUser';

const Mypage: NextPage = () => {
  const { signInUser, error } = useSignInUser();
  if (error) return <div>error...</div>;

  return (
    <>
      <Text fontSize='xl' align='center'>
        マイページ
      </Text>
      {signInUser ? signInUser.name : <Spinner />}
    </>
  );
};

export default Mypage;
