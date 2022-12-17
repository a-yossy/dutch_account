import { FC } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ManagementGroup } from 'src/openapi-generator';
import { ManagementGroupUsersList } from 'src/features/management_groups/components/ManagementGroupUsersList';
import { ManagementGroupPaymentGroupsList } from 'src/features/management_groups/components/ManagementGroupPaymentGroupsList';
import { PaymentRelationCreateModalForm } from 'src/features/payment_relations/components/PaymentRelationCreateModalForm';

type ManagementGroupTabProps = {
  managementGroup: ManagementGroup;
};

export const ManagementGroupTab: FC<ManagementGroupTabProps> = ({
  managementGroup,
}) => (
  <Tabs isFitted width={450} mx='auto' mt={5}>
    <TabList>
      <Tab>ユーザー</Tab>
      <Tab>支払グループ</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <ManagementGroupUsersList managementGroup={managementGroup} />
      </TabPanel>
      <TabPanel>
        <PaymentRelationCreateModalForm managementGroup={managementGroup} />
        <ManagementGroupPaymentGroupsList managementGroup={managementGroup} />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
