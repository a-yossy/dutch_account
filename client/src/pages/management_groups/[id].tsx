import { FC } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Text } from '@chakra-ui/react';
import { useGetManagementGroup } from 'src/hooks/useGetManagementGroup';
import { isResponseError } from 'src/libs/isResponseError';
import NotFoundErrorPage from 'src/pages/404';

type ManagementGroupWithIdProps = {
  id: string;
};

const ManagementGroupWithId: FC<ManagementGroupWithIdProps> = ({ id }) => {
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

const ManagementGroup = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') return <Spinner />;

  return <ManagementGroupWithId id={id} />;
};

export default ManagementGroup;
