import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useGetManagementGroup } from 'src/features/management_groups/api/getManagementGroup';
import NotFoundErrorPage from 'src/pages/404';
import { CenterTitle } from 'src/components/elements';
import { ManagementGroupTab } from 'src/features/management_groups/components/ManagementGroupTab';

type ManagementGroupProps = {
  managementGroupId: string;
};

export const ManagementGroup: FC<ManagementGroupProps> = ({
  managementGroupId,
}) => {
  const { managementGroup, error } = useGetManagementGroup(managementGroupId);

  if (error?.response?.status === 404) return <NotFoundErrorPage />;

  if (!managementGroup) return <Spinner />;

  return (
    <>
      <CenterTitle>管理グループ：{managementGroup.name}</CenterTitle>
      <ManagementGroupTab managementGroup={managementGroup} />
    </>
  );
};
