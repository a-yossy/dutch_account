import { FC } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Text, Box } from '@chakra-ui/react';
import { useGetManagementGroup } from 'src/hooks/useGetManagementGroup';
import { isResponseError } from 'src/libs/isResponseError';
import NotFoundErrorPage from 'src/pages/404';
import { useGetManagementAffiliationUsers } from 'src/hooks/useGetManagementAffiliationUsers';

const ManagementGroupPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') return <Spinner />;

  return <ManagementGroup id={id} />;
};

export default ManagementGroupPage;

type ManagementGroupProps = {
  id: string;
};

const ManagementGroup: FC<ManagementGroupProps> = ({ id }) => {
  const { managementGroup, error: managementGroupError } =
    useGetManagementGroup(id);
  const { managementAffiliationUsers, error: managementAffiliationUsersError } =
    useGetManagementAffiliationUsers(managementGroup?.id.toString());

  if (
    (isResponseError(managementGroupError) &&
      managementGroupError.response.status === 404) ||
    (isResponseError(managementAffiliationUsersError) &&
      managementAffiliationUsersError.response.status === 404)
  )
    return <NotFoundErrorPage />;

  if (!managementGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        管理グループ：{managementGroup.name}
      </Text>
      {managementAffiliationUsers === undefined ? (
        <Spinner />
      ) : (
        managementAffiliationUsers.map((managementAffiliationUser) => (
          <Box
            key={managementAffiliationUser.id}
            width={400}
            mx='auto'
            boxShadow='dark-lg'
            rounded='md'
            bg='#164b9f1b'
            height={12}
            display='flex'
            alignItems='center'
            pl={3}
            mt={5}
          >
            {managementAffiliationUser.name}
          </Box>
        ))
      )}
    </>
  );
};
