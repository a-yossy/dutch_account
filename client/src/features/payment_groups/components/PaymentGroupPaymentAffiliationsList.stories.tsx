import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaymentGroupPaymentAffiliationsList } from 'src/features/payment_groups/components/PaymentGroupPaymentAffiliationsList';
import { getPaymentGroupPaymentAffiliationsHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentGroupPaymentAffiliationsList,
  parameters: {
    msw: {
      handlers: [getPaymentGroupPaymentAffiliationsHandler()],
    },
  },
} as ComponentMeta<typeof PaymentGroupPaymentAffiliationsList>;

const Template: ComponentStory<typeof PaymentGroupPaymentAffiliationsList> = (
  args
) => <PaymentGroupPaymentAffiliationsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};
