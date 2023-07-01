import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupPaymentGroupsList } from 'src/features/management_groups/components/ManagementGroupPaymentGroupsList';
import { getManagementGroupPaymentGroupsHandler } from 'src/test/server/handlers/paymentGroup';

export default {
  component: ManagementGroupPaymentGroupsList,
  parameters: {
    msw: {
      handlers: [getManagementGroupPaymentGroupsHandler()],
    },
  },
} as ComponentMeta<typeof ManagementGroupPaymentGroupsList>;

const Template: ComponentStory<typeof ManagementGroupPaymentGroupsList> = (
  args
) => <ManagementGroupPaymentGroupsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  managementGroup: { id: '1', name: 'name' },
};
