import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeaderTemplate } from 'src/components/layouts/Header/Header';
import { logOutHandler } from 'src/test/server/handlers/logOut';
import { RecoilRoot } from 'recoil';
import { setInitializeState } from 'src/utils/test/setInitializeState';
import {
  CurrentManagementGroupState,
  currentManagementGroupState,
} from 'src/recoil/currentManagementGroupState';
import {
  getManagementGroupsHandler,
  getNoManagementGroupsHandler,
} from 'src/test/server/handlers/managementGroup';

type StorybookComponent = React.FC<
  React.ComponentProps<typeof HeaderTemplate> & {
    currentManagementGroupState?: CurrentManagementGroupState;
  }
>;

export default {
  component: HeaderTemplate,
  parameters: {
    msw: {
      handlers: [logOutHandler(), getManagementGroupsHandler()],
    },
  },
  decorators: [
    (Story, context) => (
      <RecoilRoot
        initializeState={setInitializeState<CurrentManagementGroupState>(
          currentManagementGroupState,
          context.args
            .currentManagementGroupState as CurrentManagementGroupState
        )}
      >
        <Story />
      </RecoilRoot>
    ),
  ],
} as ComponentMeta<StorybookComponent>;

const Template: ComponentStory<StorybookComponent> = (args) => (
  <HeaderTemplate {...args} />
);

export const LoggedInWithoutCurrentManagementGroup = Template.bind({});
LoggedInWithoutCurrentManagementGroup.args = {
  currentUser: { state: 'log_in', data: { id: '1', name: '太郎' } },
  currentManagementGroupState: { state: 'not_existence' },
};

export const LoggedInWithCurrentManagementGroup = Template.bind({});
LoggedInWithCurrentManagementGroup.args = {
  currentUser: { state: 'log_in', data: { id: '1', name: '太郎' } },
  currentManagementGroupState: {
    state: 'existence',
    data: { id: '1', name: 'group1' },
  },
};

export const LoggedInWithoutManagementGroups = Template.bind({});
LoggedInWithoutManagementGroups.parameters = {
  msw: {
    handlers: [logOutHandler(), getNoManagementGroupsHandler()],
  },
};
LoggedInWithoutManagementGroups.args = {
  currentUser: { state: 'log_in', data: { id: '1', name: '太郎' } },
  currentManagementGroupState: { state: 'not_existence' },
};

export const Loading = Template.bind({});
Loading.args = {
  currentUser: { state: 'loading' },
};

export const UnLoggedIn = Template.bind({});
UnLoggedIn.args = {
  currentUser: { state: 'log_out' },
};
