import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserLogInForm } from 'src/features/users/components/UserLogInForm';
import { logInHandler } from 'src/test/server/handlers/logIn';

export default {
  component: UserLogInForm,
  parameters: {
    msw: {
      handlers: [logInHandler()],
    },
  },
} as ComponentMeta<typeof UserLogInForm>;

const Template: ComponentStory<typeof UserLogInForm> = () => <UserLogInForm />;

export const Default = Template.bind({});
