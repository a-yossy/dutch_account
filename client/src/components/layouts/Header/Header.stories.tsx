import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeaderTemplate } from 'src/components/layouts/Header/Header';
import { logOutHandler } from 'src/test/server/handlers/logOut';

export default {
  component: HeaderTemplate,
  parameters: {
    msw: {
      handlers: [logOutHandler()],
    },
  },
} as ComponentMeta<typeof HeaderTemplate>;

const Template: ComponentStory<typeof HeaderTemplate> = (args) => (
  <HeaderTemplate {...args} />
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  currentUser: { state: 'log_in', data: { id: '1', name: '太郎' } },
};

export const Loading = Template.bind({});
Loading.args = {
  currentUser: { state: 'loading' },
};

export const UnLoggedIn = Template.bind({});
UnLoggedIn.args = {
  currentUser: { state: 'log_out' },
};
