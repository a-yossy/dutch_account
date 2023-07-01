import { FC } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ManagementGroup } from 'src/openapi-generator';
import { ManagementGroupUsersList } from 'src/features/management_groups/components/ManagementGroupUsersList';
import { ManagementGroupPaymentGroupsList } from 'src/features/management_groups/components/ManagementGroupPaymentGroupsList';
import { PaymentRelationCreateModalForm } from 'src/features/payment_relations/components/PaymentRelationCreateModalForm';

type ManagementGroupTabProps = {
  managementGroupId: ManagementGroup['id'];
};

export const ManagementGroupTab: FC<ManagementGroupTabProps> = ({
  managementGroupId,
}) => (
  <Tabs isFitted width={450} mx='auto' mt={5}>
    <TabList>
      <Tab>ユーザー</Tab>
      <Tab>支払グループ</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <ManagementGroupUsersList managementGroupId={managementGroupId} />
      </TabPanel>
      <TabPanel>
        <PaymentRelationCreateModalForm managementGroupId={managementGroupId} />
        <ManagementGroupPaymentGroupsList
          managementGroupId={managementGroupId}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
