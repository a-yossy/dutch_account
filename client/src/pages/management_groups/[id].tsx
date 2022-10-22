import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ManagementGroupWithId } from 'src/components/ManagementGroupWithId';

const ManagementGroup = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') return <Spinner />;

  return <ManagementGroupWithId id={id} />;
};

export default ManagementGroup;
