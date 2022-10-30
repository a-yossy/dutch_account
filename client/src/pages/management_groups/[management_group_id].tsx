import { FC } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Spinner,
  Text,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useGetManagementGroup } from 'src/hooks/useGetManagementGroup';
import NotFoundErrorPage from 'src/pages/404';
import { useGetManagementAffiliationUsers } from 'src/hooks/useGetManagementAffiliationUsers';
import { useGetPaymentGroups } from 'src/hooks/useGetPaymentGroups';
import { NoDecorationLink } from 'src/components/NoDecorationLink';

const ManagementGroupPage: NextPage = () => {
  const router = useRouter();
  const { management_group_id: managementGroupId } = router.query;

  if (typeof managementGroupId !== 'string') return <Spinner />;

  return <ManagementGroup managementGroupId={managementGroupId} />;
};

export default ManagementGroupPage;

type ManagementGroupProps = {
  managementGroupId: string;
};

const ManagementGroup: FC<ManagementGroupProps> = ({ managementGroupId }) => {
  const { managementGroup, error: managementGroupError } =
    useGetManagementGroup(managementGroupId);
  const { managementAffiliationUsers, error: managementAffiliationUsersError } =
    useGetManagementAffiliationUsers(managementGroup?.id);
  const { paymentGroups, error: paymentGroupsError } = useGetPaymentGroups(
    managementGroup?.id
  );

  if (
    managementGroupError?.response?.status === 404 ||
    managementAffiliationUsersError?.response?.status === 404 ||
    paymentGroupsError?.response?.status === 404
  )
    return <NotFoundErrorPage />;

  if (!managementGroup) return <Spinner />;

  return (
    <>
      <Text fontSize='xl' align='center'>
        管理グループ：{managementGroup.name}
      </Text>
      <Tabs isFitted width={450} mx='auto' mt={5}>
        <TabList>
          <Tab>ユーザー</Tab>
          <Tab>支払グループ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {managementAffiliationUsers === undefined ? (
              <Spinner />
            ) : (
              managementAffiliationUsers.map((managementAffiliationUser) => (
                <Box
                  key={managementAffiliationUser.id}
                  width={400}
                  mx='auto'
                  boxShadow='dark-lg'
                  rounded='md'
                  bg='#164b9f1b'
                  height={12}
                  display='flex'
                  alignItems='center'
                  pl={3}
                  mt={5}
                >
                  {managementAffiliationUser.name}
                </Box>
              ))
            )}
          </TabPanel>
          <TabPanel>
            {paymentGroups === undefined && <Spinner />}
            {paymentGroups !== undefined &&
              (paymentGroups.length === 0 ? (
                <Text align='center' mt={5}>
                  グループが存在しません
                </Text>
              ) : (
                paymentGroups.map((paymentGroup) => (
                  <NoDecorationLink
                    href={`/management_groups/${managementGroupId}/payment_groups/${paymentGroup.id}`}
                    key={paymentGroup.id}
                    width={400}
                    mx='auto'
                    boxShadow='dark-lg'
                    rounded='md'
                    bg='#164b9f1b'
                    height={12}
                    display='flex'
                    alignItems='center'
                    pl={3}
                    mt={5}
                  >
                    {paymentGroup.name}
                  </NoDecorationLink>
                ))
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
