import { Spinner, Box } from '@chakra-ui/react';
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
    <Box
      width={400}
      mx='auto'
      boxShadow='dark-lg'
      rounded='md'
      bg='#164b9f1b'
      height={12}
      display='flex'
      alignItems='center'
      pl={3}
    >
      {managementGroup.name}
    </Box>
  );
};

export default ManagementGroup;
