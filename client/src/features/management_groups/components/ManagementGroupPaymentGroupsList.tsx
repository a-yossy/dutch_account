import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useGetManagementGroupPaymentGroups } from 'src/features/management_groups/api/getManagementGroupPaymentGroups';
import { CenterTitle, NoDecorationLink } from 'src/components/elements';
import { ManagementGroup } from 'src/openapi-generator';

type ManagementGroupPaymentGroupsListProps = {
  managementGroupId: ManagementGroup['id'];
};

export const ManagementGroupPaymentGroupsList: FC<
  ManagementGroupPaymentGroupsListProps
> = ({ managementGroupId }) => {
  const { managementGroupPaymentGroups, error } =
    useGetManagementGroupPaymentGroups(managementGroupId);

  if (error?.response?.status === 404)
    return <CenterTitle mt={5}>グループが見つかりません</CenterTitle>;

  return (
    <div>
      {managementGroupPaymentGroups === undefined && <Spinner />}
      {managementGroupPaymentGroups !== undefined &&
        (managementGroupPaymentGroups.length === 0 ? (
          <CenterTitle mt={5}>グループが存在しません</CenterTitle>
        ) : (
          managementGroupPaymentGroups.map((managementGroupPaymentGroup) => (
            <NoDecorationLink
              display='flex'
              alignItems='center'
              key={managementGroupPaymentGroup.id}
              href={`/payment_groups/${managementGroupPaymentGroup.id}`}
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
            </NoDecorationLink>
          ))
        ))}
    </div>
  );
};
