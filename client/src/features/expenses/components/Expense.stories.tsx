import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expense } from 'src/features/expenses/components/Expense';
import {
  getExpenseHandler,
  updateExpenseHandler,
} from 'src/test/server/handlers/expense';

export default {
  component: Expense,
  parameters: {
    msw: {
      handlers: [getExpenseHandler(), updateExpenseHandler()],
    },
  },
} as ComponentMeta<typeof Expense>;

const Template: ComponentStory<typeof Expense> = (args) => (
  <Expense {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
  expenseId: '1',
};
