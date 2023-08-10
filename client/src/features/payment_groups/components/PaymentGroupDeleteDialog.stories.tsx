import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentGroupDeleteDialog } from 'src/features/payment_groups/components/PaymentGroupDeleteDialog';
import { deletePaymentGroupHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentGroupDeleteDialog,
  parameters: {
    msw: {
      handlers: [deletePaymentGroupHandler()],
    },
  },
} as ComponentMeta<typeof PaymentGroupDeleteDialog>;

const Template: ComponentStory<typeof PaymentGroupDeleteDialog> = (args) => (
  <PaymentGroupDeleteDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};
