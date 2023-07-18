import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExpenseDeleteDialog } from 'src/features/expenses/components/ExpenseDeleteDialog';
import { deleteExpenseHandler } from 'src/test/server/handlers/expense';

export default {
  component: ExpenseDeleteDialog,
  parameters: {
    msw: {
      handlers: [deleteExpenseHandler()],
    },
  },
} as ComponentMeta<typeof ExpenseDeleteDialog>;

const Template: ComponentStory<typeof ExpenseDeleteDialog> = (args) => (
  <ExpenseDeleteDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
  expenseId: '1',
};
