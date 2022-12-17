import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { ManagementGroupsList } from 'src/features/management_groups/components/ManagementGroupsList';

export const ManagementGroups: FC = () => (
  <>
    <CenterTitle>管理グループ</CenterTitle>
    <ManagementGroupsList />
  </>
);
