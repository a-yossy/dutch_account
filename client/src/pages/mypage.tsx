import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import useGetSignInUser from 'src/hooks/useGetSignInUser';

const Mypage: NextPage = () => {
  const signInUser = useGetSignInUser();

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
