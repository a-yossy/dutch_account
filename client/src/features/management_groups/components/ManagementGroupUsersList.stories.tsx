import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupUsersList } from 'src/features/management_groups/components/ManagementGroupUsersList';
import { getManagementGroupUsersHandler } from 'src/test/server/handlers/managementGroup';

export default {
  component: ManagementGroupUsersList,
  parameters: {
    msw: {
      handlers: [getManagementGroupUsersHandler()],
    },
  },
} as ComponentMeta<typeof ManagementGroupUsersList>;

const Template: ComponentStory<typeof ManagementGroupUsersList> = () => (
  <ManagementGroupUsersList managementGroup={{ id: '1', name: 'group' }} />
);
export const Default = Template.bind({});
