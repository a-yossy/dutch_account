import type { ReactElement } from 'react';
import { Text, Spinner } from '@chakra-ui/react';
import useGetSignInUser from 'src/hooks/useGetSignInUser';
import SignedInLayout from 'src/components/layouts/SignedInLayout';
import type NextPageWithLayout from 'src/types/nextPageWithLayout';

const Mypage: NextPageWithLayout = () => {
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

Mypage.getLayout = (page: ReactElement) => (
  <SignedInLayout>{page}</SignedInLayout>
);

export default Mypage;
