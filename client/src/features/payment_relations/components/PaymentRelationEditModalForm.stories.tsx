import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentRelationEditModalForm } from 'src/features/payment_relations/components/PaymentRelationEditModalForm';
import { getManagementGroupUsersHandler } from 'src/test/server/handlers/user';
import {
  bulkUpdatePaymentRelationHandler,
  getNoPaymentGroupExpensesHandler,
  getPaymentGroupExpensesHandler,
  getPaymentGroupHandler,
  getPaymentGroupPaymentAffiliationsHandler,
} from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentRelationEditModalForm,
  parameters: {
    msw: {
      handlers: [
        getManagementGroupUsersHandler(),
        bulkUpdatePaymentRelationHandler(),
        getPaymentGroupHandler(),
        getPaymentGroupPaymentAffiliationsHandler(),
        getPaymentGroupExpensesHandler(),
      ],
    },
  },
} as ComponentMeta<typeof PaymentRelationEditModalForm>;

const Template: ComponentStory<typeof PaymentRelationEditModalForm> = (
  args
) => <PaymentRelationEditModalForm {...args} />;

export const WithExpenses = Template.bind({});
WithExpenses.args = {
  managementGroupId: '1',
  paymentGroupId: '1',
};

export const WithoutExpenses = Template.bind({});
WithoutExpenses.parameters = {
  msw: {
    handlers: [
      getManagementGroupUsersHandler(),
      bulkUpdatePaymentRelationHandler(),
      getPaymentGroupHandler(),
      getPaymentGroupPaymentAffiliationsHandler(),
      getNoPaymentGroupExpensesHandler(),
    ],
  },
};
WithoutExpenses.args = {
  managementGroupId: '1',
  paymentGroupId: '2',
};
