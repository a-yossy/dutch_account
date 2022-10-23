import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import { useGetCurrentUser } from 'src/hooks/useGetCurrentUser';

const MypagePage: NextPage = () => {
  const currentUser = useGetCurrentUser();

  if (!currentUser) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        マイページ
      </Text>
      {currentUser.name}
    </>
  );
};

export default MypagePage;
