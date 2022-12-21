import { FC } from 'react';
import { Text, Spinner } from '@chakra-ui/react';
import { useGetManagementGroups } from 'src/features/management_groups/api/getManagementGroups';
import { OneLineCardLink } from 'src/components/elements';

export const ManagementGroupsList: FC = () => {
  const managementGroups = useGetManagementGroups();

  if (!managementGroups) return <Spinner />;

  return (
    <div>
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
    </div>
  );
};
