import { FC } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Text, Box } from '@chakra-ui/react';
import { useGetManagementGroup } from 'src/hooks/useGetManagementGroup';
import { isResponseError } from 'src/libs/isResponseError';
import NotFoundErrorPage from 'src/pages/404';
import { useGetManagementAffiliationUsers } from 'src/hooks/useGetManagementAffiliationUsers';
import { ManagementGroup } from 'src/openapi-generator';

type ManagementAffiliationUsersWithManagementGroupProps = {
  managementGroup: ManagementGroup;
};

const ManagementAffiliationUsersWithManagementGroup: FC<
  ManagementAffiliationUsersWithManagementGroupProps
> = ({ managementGroup }) => {
  const { managementAffiliationUsers, error } =
    useGetManagementAffiliationUsers(managementGroup.id.toString());
  if (isResponseError(error) && error.response.status === 404)
    return <NotFoundErrorPage />;
  if (!managementAffiliationUsers) return <Spinner />;

  return (
    <>
      {managementAffiliationUsers.map((managementAffiliationUser) => (
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
      ))}
    </>
  );
};

type ManagementGroupWithIdProps = {
  id: string;
};

const ManagementGroupWithId: FC<ManagementGroupWithIdProps> = ({ id }) => {
  const { managementGroup, error } = useGetManagementGroup(id);

  if (isResponseError(error) && error.response.status === 404)
    return <NotFoundErrorPage />;
  if (!managementGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        管理グループ：{managementGroup.name}
      </Text>
      <ManagementAffiliationUsersWithManagementGroup
        managementGroup={managementGroup}
      />
    </>
  );
};

const ManagementGroupPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') return <Spinner />;

  return <ManagementGroupWithId id={id} />;
};

export default ManagementGroupPage;
