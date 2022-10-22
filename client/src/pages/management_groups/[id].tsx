import { Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useGetManagementGroup } from 'src/hooks/useGetManagementGroup';
import { isResponseError } from 'src/libs/isResponseError';
import NotFoundErrorPage from '../404';

const ManagementGroup = () => {
  const router = useRouter();
  const { id } = router.query;
  const { managementGroup, error } = useGetManagementGroup(id);

  if (isResponseError(error) && error.response.status === 404)
    return <NotFoundErrorPage />;
  if (!managementGroup) return <Spinner />;

  return (
    <Text fontSize='xl' align='center'>
      {managementGroup.name}
    </Text>
  );
};

export default ManagementGroup;
