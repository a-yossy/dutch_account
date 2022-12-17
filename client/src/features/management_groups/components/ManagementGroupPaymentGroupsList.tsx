import { FC } from 'react';
import { Spinner, Text } from '@chakra-ui/react';
import NotFoundErrorPage from 'src/pages/404';
import { useGetManagementGroupPaymentGroups } from 'src/features/management_groups/api/getManagementGroupPaymentGroups';
import { OneLineCardLink } from 'src/components/elements';
import { ManagementGroup } from 'src/openapi-generator';

type ManagementGroupPaymentGroupsListProps = {
  managementGroup: ManagementGroup;
};

export const ManagementGroupPaymentGroupsList: FC<
  ManagementGroupPaymentGroupsListProps
> = ({ managementGroup }) => {
  const { managementGroupPaymentGroups, error } =
    useGetManagementGroupPaymentGroups(managementGroup.id);

  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  return (
    <div>
      {managementGroupPaymentGroups === undefined && <Spinner />}
      {managementGroupPaymentGroups !== undefined &&
        (managementGroupPaymentGroups.length === 0 ? (
          <Text align='center' mt={5}>
            グループが存在しません
          </Text>
        ) : (
          managementGroupPaymentGroups.map((managementGroupPaymentGroup) => (
            <OneLineCardLink
              key={managementGroupPaymentGroup.id}
              href={`/management_groups/${managementGroup.id}/payment_groups/${managementGroupPaymentGroup.id}`}
              mx='auto'
              bg='#164b9f1b'
              boxShadow='dark-lg'
              rounded='md'
              height={12}
              width={400}
              pl={3}
              mt={5}
            >
              {managementGroupPaymentGroup.name}
            </OneLineCardLink>
          ))
        ))}
    </div>
  );
};
