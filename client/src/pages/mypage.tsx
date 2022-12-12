import type { NextPage } from 'next';
import { Spinner } from '@chakra-ui/react';
import { useGetCurrentUser } from 'src/hooks/useGetCurrentUser';
import { CenterTitle } from 'src/components/elements';

const MypagePage: NextPage = () => {
  const currentUser = useGetCurrentUser();

  if (!currentUser) return <Spinner />;

  return (
    <>
      <CenterTitle>マイページ</CenterTitle>
      {currentUser.name}
    </>
  );
};

export default MypagePage;
