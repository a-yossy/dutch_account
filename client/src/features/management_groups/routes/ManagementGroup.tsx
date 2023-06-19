import { FC, useState, useEffect } from 'react';
import NotFoundErrorPage from 'src/pages/404';
import { CenterTitle } from 'src/components/elements';
import { ManagementGroupTab } from 'src/features/management_groups/components/ManagementGroupTab';
import { useGetCurrentManagementGroup } from 'src/recoil/currentManagementGroupState';
import { useGetCurrentUser } from 'src/recoil/currentUserState';
import { Spinner } from '@chakra-ui/react';

export const ManagementGroup: FC = () => {
  const currentUser = useGetCurrentUser();
  const currentManagementGroup = useGetCurrentManagementGroup();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (currentUser.state === 'loading') return <Spinner />;
  if (currentUser.state === 'log_out') return <NotFoundErrorPage />;
  if (currentManagementGroup.state === 'not_existence')
    return <CenterTitle>管理グループを選択してください</CenterTitle>;

  return isClient ? (
    <>
      <CenterTitle>
        管理グループ：{currentManagementGroup.data.name}
      </CenterTitle>
      <ManagementGroupTab managementGroup={currentManagementGroup.data} />
    </>
  ) : null;
};
