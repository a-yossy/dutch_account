import { FC, useEffect, useState } from 'react';
import { Badge, Spacer, Spinner, Box } from '@chakra-ui/react';
import { useGetManagementGroupUsers } from 'src/features/management_groups/api/getManagementGroupUsers';
import { CenterTitle } from 'src/components/elements';
import { ManagementGroup } from 'src/openapi-generator';
import { useGetManagementGroupTotalBorrowingAndLendings } from '../api/getManagementGroupTotalBorrowingAndLendings';

type ManagementGroupUsersListProps = {
  managementGroupId: ManagementGroup['id'];
};

export const ManagementGroupUsersList: FC<ManagementGroupUsersListProps> = ({
  managementGroupId,
}) => {
  const { managementGroupUsers, error: managementGroupUsersError } =
    useGetManagementGroupUsers(managementGroupId);
  const {
    managementGroupTotalBorrowingAndLendings,
    error: managementGroupTotalBorrowingAndLendingsError,
  } = useGetManagementGroupTotalBorrowingAndLendings(managementGroupId);
  const [totalBorrowingAndLendings, setTotalBorrowingAndLendings] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (managementGroupTotalBorrowingAndLendings !== undefined) {
      setTotalBorrowingAndLendings(
        managementGroupTotalBorrowingAndLendings.reduce(
          (acc, { user_id, amount_of_money }) => {
            acc[user_id] = amount_of_money;

            return acc;
          },
          {} as Record<string, number>
        )
      );
    }

    return () => setTotalBorrowingAndLendings({});
  }, [managementGroupTotalBorrowingAndLendings]);

  if (managementGroupUsersError?.response?.status === 404)
    return <CenterTitle mt={5}>ユーザーが見つかりません</CenterTitle>;
  if (managementGroupTotalBorrowingAndLendingsError?.response?.status === 404)
    return <CenterTitle mt={5}>総貸借が見つかりません</CenterTitle>;

  return (
    <div>
      {managementGroupUsers === undefined ? (
        <Spinner />
      ) : (
        managementGroupUsers.map((managementGroupUser) => (
          <Box
            display='flex'
            alignItems='center'
            key={managementGroupUser.id}
            mx='auto'
            bg='#164b9f1b'
            boxShadow='dark-lg'
            rounded='md'
            height={12}
            width={400}
            pl={3}
            pr={3}
            mt={5}
          >
            {managementGroupUser.name}
            <Spacer />
            {managementGroupTotalBorrowingAndLendings === undefined ? (
              <Spinner />
            ) : (
              <Badge>{totalBorrowingAndLendings[managementGroupUser.id]}</Badge>
            )}
          </Box>
        ))
      )}
    </div>
  );
};
