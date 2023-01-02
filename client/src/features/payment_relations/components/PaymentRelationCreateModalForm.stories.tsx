import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentRelationCreateModalForm } from 'src/features/payment_relations/components/PaymentRelationCreateModalForm';
import { getManagementGroupUsersHandler } from 'src/test/server/handlers/managementGroup';
import { bulkInsertPaymentRelationHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: PaymentRelationCreateModalForm,
  parameters: {
    msw: {
      handlers: [
        getManagementGroupUsersHandler(),
        bulkInsertPaymentRelationHandler(),
      ],
    },
  },
} as ComponentMeta<typeof PaymentRelationCreateModalForm>;

const Template: ComponentStory<typeof PaymentRelationCreateModalForm> = (
  args
) => <PaymentRelationCreateModalForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  managementGroup: {
    id: '1',
    name: 'group',
  },
};
