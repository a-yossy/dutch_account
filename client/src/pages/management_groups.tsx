import type { NextPage } from 'next';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { useGetManagementGroups } from 'src/hooks/useGetManagementGroups';

const ManagementGroups: NextPage = () => {
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
          <Box
            key={managementGroup.id}
            width={400}
            mx='auto'
            boxShadow='dark-lg'
            rounded='md'
            bg='#2470e91b'
            height={12}
            display='flex'
            alignItems='center'
            pl={3}
            mt={5}
          >
            {managementGroup.name}
          </Box>
        ))
      )}
    </>
  );
};

export default ManagementGroups;
