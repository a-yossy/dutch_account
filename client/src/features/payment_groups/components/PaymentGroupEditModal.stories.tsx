import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentGroupEditModal } from 'src/features/payment_groups/components/PaymentGroupEditModal';
import {
  getPaymentGroupHandler,
  updatePaymentGroupHandler,
} from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentGroupEditModal,
  parameters: {
    msw: {
      handlers: [updatePaymentGroupHandler(), getPaymentGroupHandler()],
    },
  },
} as ComponentMeta<typeof PaymentGroupEditModal>;

const Template: ComponentStory<typeof PaymentGroupEditModal> = (args) => (
  <PaymentGroupEditModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};
