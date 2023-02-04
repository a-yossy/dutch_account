import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useGetManagementGroupUsers } from 'src/features/management_groups/api/getManagementGroupUsers';
import { OneLineCard, CenterTitle } from 'src/components/elements';
import { ManagementGroup } from 'src/openapi-generator';

type ManagementGroupUsersListProps = {
  managementGroup: ManagementGroup;
};

export const ManagementGroupUsersList: FC<ManagementGroupUsersListProps> = ({
  managementGroup,
}) => {
  const { managementGroupUsers, error } = useGetManagementGroupUsers(
    managementGroup.id
  );

  if (error?.response?.status === 404)
    return <CenterTitle>ユーザーが見つかりません</CenterTitle>;

  return (
    <div>
      {managementGroupUsers === undefined ? (
        <Spinner />
      ) : (
        managementGroupUsers.map((managementGroupUser) => (
          <OneLineCard
            key={managementGroupUser.id}
            mx='auto'
            bg='#164b9f1b'
            boxShadow='dark-lg'
            rounded='md'
            height={12}
            width={400}
            pl={3}
            mt={5}
          >
            {managementGroupUser.name}
          </OneLineCard>
        ))
      )}
    </div>
  );
};
