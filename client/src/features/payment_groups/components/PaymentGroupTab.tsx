import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ManagementGroup, PaymentGroup } from 'src/openapi-generator';
import { PaymentGroupExpensesList } from 'src/features/payment_groups/components/PaymentGroupExpensesList';
import { PaymentGroupPaymentAffiliationsList } from 'src/features/payment_groups/components/PaymentGroupPaymentAffiliationsList';
import { ExpensesCreateModalForm } from 'src/features/expenses/components/ExpensesCreateModalForm';

type PaymentGroupTabProps = {
  managementGroupId: ManagementGroup['id'];
  paymentGroupId: PaymentGroup['id'];
};

export const PaymentGroupTab: FC<PaymentGroupTabProps> = ({
  managementGroupId,
  paymentGroupId,
}) => (
  <Tabs isFitted width={450} mx='auto' mt={5}>
    <TabList>
      <Tab>ユーザー</Tab>
      <Tab>費用</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <PaymentGroupPaymentAffiliationsList
          managementGroupId={managementGroupId}
          paymentGroupId={paymentGroupId}
        />
      </TabPanel>
      <TabPanel>
        <Center>
          <ExpensesCreateModalForm
            managementGroupId={managementGroupId}
            paymentGroupId={paymentGroupId}
          />
        </Center>
        <PaymentGroupExpensesList
          managementGroupId={managementGroupId}
          paymentGroupId={paymentGroupId}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
