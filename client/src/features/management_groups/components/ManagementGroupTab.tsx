import { FC } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import { ManagementGroup } from 'src/openapi-generator';
import { ManagementGroupUsersList } from 'src/features/management_groups/components/ManagementGroupUsersList';
import { ManagementGroupPaymentGroupsList } from 'src/features/management_groups/components/ManagementGroupPaymentGroupsList';
import { PaymentRelationCreateModalForm } from 'src/features/payment_relations/components/PaymentRelationCreateModalForm';
import { MarkDebtRecordsAsPaidDialog } from 'src/features/debt_records/components/MarkDebtRecordsAsPaidDialog';

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
        <Center>
          <MarkDebtRecordsAsPaidDialog managementGroupId={managementGroupId} />
        </Center>
        <ManagementGroupUsersList managementGroupId={managementGroupId} />
      </TabPanel>
      <TabPanel>
        <Center>
          <PaymentRelationCreateModalForm
            managementGroupId={managementGroupId}
          />
        </Center>
        <ManagementGroupPaymentGroupsList
          managementGroupId={managementGroupId}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
