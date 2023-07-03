import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExpensesCreateModalForm } from 'src/features/expenses/components/ExpensesCreateModalForm';
import { bulkInsertExpenseWithDebtRecordsHandler } from 'src/test/server/handlers/expense';
import { getPaymentGroupPaymentAffiliationsHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: ExpensesCreateModalForm,
  parameters: {
    msw: {
      handlers: [
        bulkInsertExpenseWithDebtRecordsHandler(),
        getPaymentGroupPaymentAffiliationsHandler(),
      ],
    },
  },
} as ComponentMeta<typeof ExpensesCreateModalForm>;

const Template: ComponentStory<typeof ExpensesCreateModalForm> = (args) => (
  <ExpensesCreateModalForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};
