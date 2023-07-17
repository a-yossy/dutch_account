import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExpenseEditModalForm } from 'src/features/expenses/components/ExpenseEditModalForm';
import { getPaymentGroupPaymentAffiliationsHandler } from 'src/test/server/handlers/paymentGroup';
import {
  getExpenseHandler,
  updateExpenseHandler,
} from 'src/test/server/handlers/expense';

export default {
  component: ExpenseEditModalForm,
  parameters: {
    msw: {
      handlers: [
        getPaymentGroupPaymentAffiliationsHandler(),
        updateExpenseHandler(),
        getExpenseHandler(),
      ],
    },
  },
} as ComponentMeta<typeof ExpenseEditModalForm>;

const Template: ComponentStory<typeof ExpenseEditModalForm> = (args) => (
  <ExpenseEditModalForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
  expenseId: '1',
};
