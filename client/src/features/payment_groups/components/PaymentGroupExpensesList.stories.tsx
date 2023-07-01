import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentGroupExpensesList } from 'src/features/payment_groups/components/PaymentGroupExpensesList';
import { getPaymentGroupExpensesHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentGroupExpensesList,
  parameters: {
    msw: {
      handlers: [getPaymentGroupExpensesHandler()],
    },
  },
} as ComponentMeta<typeof PaymentGroupExpensesList>;

const Template: ComponentStory<typeof PaymentGroupExpensesList> = (args) => (
  <PaymentGroupExpensesList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};
