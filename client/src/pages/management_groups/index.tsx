import type { NextPage } from 'next';
import { Text, Spinner } from '@chakra-ui/react';
import { useGetManagementGroups } from 'src/features/management_groups/hooks/useGetManagementGroups';
import { CenterTitle, OneLineCardLink } from 'src/components/elements';

const ManagementGroupsPage: NextPage = () => {
  const managementGroups = useGetManagementGroups();

  if (!managementGroups) return <Spinner />;

  return (
    <>
      <CenterTitle>管理グループ</CenterTitle>
      {managementGroups.length === 0 ? (
        <Text align='center' mt={5}>
          グループが存在しません
        </Text>
      ) : (
        managementGroups.map((managementGroup) => (
          <OneLineCardLink
            key={managementGroup.id}
            href={`/management_groups/${managementGroup.id}`}
            mx='auto'
            bg='#164b9f1b'
            boxShadow='dark-lg'
            rounded='md'
            height={12}
            width={400}
            pl={3}
            mt={5}
          >
            {managementGroup.name}
          </OneLineCardLink>
        ))
      )}
    </>
  );
};

export default ManagementGroupsPage;
