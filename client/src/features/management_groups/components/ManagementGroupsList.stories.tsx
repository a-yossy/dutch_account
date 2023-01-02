import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupsList } from 'src/features/management_groups/components/ManagementGroupsList';
import { getManagementGroupsHandler } from 'src/test/server/handlers/managementGroup';

export default {
  component: ManagementGroupsList,
  parameters: {
    msw: {
      handlers: [getManagementGroupsHandler()],
    },
  },
} as ComponentMeta<typeof ManagementGroupsList>;

const Template: ComponentStory<typeof ManagementGroupsList> = () => (
  <ManagementGroupsList />
);
export const Default = Template.bind({});
