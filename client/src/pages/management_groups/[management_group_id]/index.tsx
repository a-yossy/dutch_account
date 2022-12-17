import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { ManagementGroup } from 'src/features/management_groups';

const ManagementGroupPage: NextPage = () => {
  const router = useRouter();
  const { management_group_id: managementGroupId } = router.query;

  if (typeof managementGroupId !== 'string') return <Spinner />;

  return <ManagementGroup managementGroupId={managementGroupId} />;
};

export default ManagementGroupPage;
