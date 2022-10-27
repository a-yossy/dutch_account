import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import { useGetManagementGroups } from 'src/hooks/useGetManagementGroups';
import { NoDecorationLink } from 'src/components/NoDecorationLink';

const ManagementGroupsPage: NextPage = () => {
  const managementGroups = useGetManagementGroups();

  if (!managementGroups) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        管理グループ
      </Text>
      {managementGroups.length === 0 ? (
        <Text align='center' mt={5}>
          グループが存在しません
        </Text>
      ) : (
        managementGroups.map((managementGroup) => (
          <NoDecorationLink
            href={`/management_groups/${managementGroup.id}`}
            key={managementGroup.id}
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
            {managementGroup.name}
          </NoDecorationLink>
        ))
      )}
    </>
  );
};

export default ManagementGroupsPage;
